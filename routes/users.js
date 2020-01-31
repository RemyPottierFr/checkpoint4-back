const express = require('express');
const connection = require('../bdd');

const router = express.Router();


router.post('/', (req, res) => {
  connection.query(`INSERT INTO users (firstname, lastname, email) values (?);`, req.body, (err, results) => {
    if (err) {
      res.send('Oups a clown broke this !');
    }
    res.status(200).send(results)
  });
})


module.exports = router;
