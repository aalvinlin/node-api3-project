const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  let userId = req.body.id;

  if (getById(userId).length !== 0)
    {
      req.user = userId;
      next();
    }
  else
    { res.status(400).json({ message: "invalid user id" }); }
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
