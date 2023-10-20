const bcrypt = require('bcrypt');

exports.hash = (value) => {
  return bcrypt.hash(value, 10);
};

exports.compare = (data, encripted) => {
  return bcrypt.compare(data, encripted);
};
