const express = require('express');
const database = require("./postDb");

const router = express.Router();


router.post('/', validatePost, (req, res) => {
  database.insert(req.body)
    .then(response => {
      console.log("database response:", response);
      res.status(201).json(response);
    })
    .catch (error => {
      console.log("database error:", error)
      res.status(500).json({ message: "database error: GET /" });
    })
});


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

router.get('/:id', validatePostId, (req, res) => {

  res.status(200).json(req.response);

});

router.delete('/:id', validatePostId, (req, res) => {
  database.remove(req.response.id)
  .then(response => {
    console.log("Post with ID ", req.response, "removed:", response);
    res.status(200).json(response);
  })
  .catch (error => {
    console.log("database error:", error)
    console.log("Couldn't remove post with ID", req.response, ".", error);
  })
});

router.put('/:id', validatePostId, (req, res) => {
  database.update(req.response.id, req.body)
  .then(response => {
    console.log("Post with ID ", req.response, "updated:", response);
    res.status(200).json(response);
  })
  .catch (error => {
    console.log("database error:", error)
    console.log("Couldn't update post with ID", req.response, ".", error);
  })
});

// custom middleware

function validatePostId(req, res, next) {
  
  let id = req.params.id;

  database.getById(id)
    .then(response => {

      if (!response)
        { res.status(400).json({ message: "invalid post id" }); }

      else
        {
          req.response = response;
          next();
        }
    })
    .catch (error => {
      console.log("database error:", error);
      res.status(500).json({message: "database error: GET /:id"});
    })

}

function validatePost(req, res, next) {

  if (!req.body)
    { res.status(400).json({ message: "missing post data" }); }
  else if (!req.body.text)
    { res.status(400).json({ message: "missing required text field" }); }
  
  next();

}

module.exports = router;
