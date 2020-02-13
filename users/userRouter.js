const express = require('express');
const database = require("./userDb");

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  database.insert(req.body)
    .then(response => {
      console.log("added user:", response);
      res.status(201).json(response);
    })
    .catch (error => {
      console.log("database error:", error)
      res.status(500).json({ message: "couldn't add user" });
    })
});

// handled in postRouter instead
// router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
//   // do your magic!
// });

router.get('/', (req, res) => {
  database.get()
    .then(response => {
      console.log("database response:", response);
      res.status(200).json(response);
    })
    .catch (error => {
      console.log("database error:", error)
      res.status(500).json({ message: "database error: GET /" });
    })
});

router.get('/:id', validateUserId, (req, res) => {

  res.status(200).json(req.user);

});

router.get('/:id/posts', validateUserId, (req, res) => {
  database.getUserPosts(req.user.id)
    .then(response => {
      console.log("user posts retrieved:", response);
      res.status(200).json(response);
    })
    .catch (error => {
      console.log("database error:", error)
      res.status(500).json({ message: "couldn't get user posts" });
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  database.remove(req.user.id)
  .then(response => {
    console.log("Post with ID ", req.user, "removed:", response);
    res.status(200).json(response);
  })
  .catch (error => {
    console.log("database error:", error)
    console.log("Couldn't remove post with ID", req.user, ".", error);
  })
});

router.put('/:id', validateUserId, (req, res) => {
  database.update(req.user.id, req.body)
  .then(response => {
    console.log("Post with ID ", req.user, "updated:", response);
    res.status(200).json(response);
  })
  .catch (error => {
    console.log("database error:", error)
    console.log("Couldn't update post with ID", req.user, ".", error);
  })
});

//custom middleware

function validateUserId(req, res, next) {
  
  let id = req.params.id;

  database.getById(id)
    .then(response => {

      if (!response)
        { res.status(400).json({ message: "invalid user id" }); }

      else
        {
          req.user = response;
          next();
        }
    })
    .catch (error => {
      console.log("database error:", error);
      res.status(500).json({message: "database error: GET /:id"});
    })

}

function validateUser(req, res, next) {

  if (!req.body)
    { res.status(400).json({ message: "missing user data" }); }
  
  else if (!req.body.name)
    { res.status(400).json({ message: "missing required name field" }); }
  
  next();
}

function validatePost(req, res, next) {
  
  if (!req.body)
    { res.status(400).json({ message: "missing post data" }); }
  
  else if (!req.body.text)
    { res.status(400).json({ message: "missing required text field" }); }
  
  next();

}

module.exports = router;
