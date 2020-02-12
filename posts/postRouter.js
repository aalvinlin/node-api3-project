const express = require('express');
const database = require("./postDb");

const router = express.Router();

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
  // do your magic!
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  let postId = req.body.id;

  if (getById(postId).length !== 0)
    {
      req.post = postId;
      next();
    }
  else
    { res.status(400).json({ message: "invalid post id" }); }
}

module.exports = router;
