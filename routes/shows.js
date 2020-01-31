const express = require('express');
const connection = require('../bdd');
const auth = require('../authentication');

const router = express.Router();


router.get('/', (req, res) => {
  connection.query(`SELECT * FROM shows`, (err, results) => {
    if (err) {
      console.log(err)
      res.send('Oups a clown broke this !');
    }
    res.header('X-Total-Count', results.length);
    res.send(results)
  });
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.query(`SELECT * FROM shows where idshows=?;`, [id], (err, results) => {
    if (err) {
      res.send('Oups a clown broke this !');
    }
    res.status(200).send(results)
  });
})

router.put('/', (req, res) => {
  const { id, participants } = req.body;
  connection.query(`UPDATE shows SET participants=? WHERE idshows=?;`, [participants, id], (err, results) => {
    if (err) {
      res.send('Oups a clown broke this !');
    }
    res.status(200).send(results)
  });
})

router.post('/', (req, res) => {
  res.send('plop')
})
router.delete('/', (req, res) => {
  res.send('plop')
})


module.exports = router;
