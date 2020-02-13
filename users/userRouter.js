const express = require('express');
const database = require("./userDb");

const router = express.Router();

router.post('/', validateUserId, (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
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

router.get('/:id', validateUserId, (req, res) => {

  res.status(200).json(req.user);

});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
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
