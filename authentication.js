const argon2 = require('argon2');
const randomBytes = require('randombytes');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const connection = require('./bdd');

const secret = process.env.JWT_SECRET;
const isAuthenticated = expressJWT({ secret });

const authenticate = async ({ email, password }) => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM admin WHERE email = ?;', [email], (err, user) => {
    console.log(user)
    if (err) return reject(err);
    if (!user) {
      throw new Error();
    }

    const isPasswordCorrect = argon2.verify(user.password, password);
    if (!isPasswordCorrect) {
      throw new Error()
    }

    let payload = {
      id: user.id,
    };
    return resolve({
      token: jwt.sign(payload, secret, { expiresIn: '12h' }),
    })
  })
})


module.exports = {
  authenticate, isAuthenticated
};
