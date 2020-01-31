require('dotenv').config();
const express = require('express');
const argon2 = require('argon2');
const randomBytes = require('randombytes');
const connection = require('./bdd');
const auth = require('./authentication');

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/api/v1/', (req, res) => {
  res.send('Hello on Wild Circus API')
})

app.use('/api/v1/artists', require('./routes/artists'));
app.use('/api/v1/shows', require('./routes/shows'));
app.use('/api/v1/users', require('./routes/users'));

app.post('/api/v1/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await auth.authenticate({ email, password });
    res.send(token);
  } catch (err) {
    res.status(401).send(err);
  }
});

app.post('/api/v1/admin', async (req, res) => {
  const {
    email, password,
  } = req.body;
  const salt = randomBytes(32);
  const hashedPassword = await argon2.hash(password, { salt });
  console.log({ email, password: hashedPassword })
  connection.query('INSERT INTO admin (email, password) values (?,?);', [email, hashedPassword], (err, results) => {
    if (err) {
      res.send('Oups a clown broke this !');
    }
    res.status(200).send(results);
  })
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  // eslint-disable-next-line no-console
  console.log(`Server is listening on ${port}`);
});