const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.hash = (value) => {
  return bcrypt.hash(value, 10);
};

exports.compare = (data, encripted) => {
  return bcrypt.compare(data, encripted);
};

exports.sign = (payload, secret) => {
  return jwt.sign(payload, secret);
};

exports.verify = (token, secret) => {
  return jwt.verify(token, secret);
};
