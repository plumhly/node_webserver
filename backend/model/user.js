const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1/plum')
  .then(() => {
    console.log('db connect!!!');
  })
  .catch((err) => {
    console.error(error);
  });

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const register = (username, password) => {
  return User.create({ username, password });
};

const find = (username) => {
  return User.findOne({ username }).exec();
};

const userList = () => {
  return User.find().exec();
};

const deleteUser = (username) => {
  return User.deleteOne({ username }).exec();
};

exports.register = register;
exports.find = find;
exports.userList = userList;
exports.deleteUser = deleteUser;
