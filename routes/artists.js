const express = require('express');
const connection = require('../bdd');

const router = express.Router();


router.get('/', (req, res) => {
  connection.query(`SELECT * FROM artists`, (err, results) => {
    if (err) {
      res.send('Oups a clown broke this !');
    }
    res.send(results)
  });
})


module.exports = router;