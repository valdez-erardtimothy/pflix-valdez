/* 
  misc routes
  for everything that is not part of the requirements

 */
const express = require('express');
const router = express.Router();

router.get('/test', function (req, res) {

  res.send({ message: "you are connected to pflix!" });
});

module.exports = router;