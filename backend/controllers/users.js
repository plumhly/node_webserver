const { json } = require('express');
const User = require('../model/user');
const { hash, compare, sign } = require('../utils/encript');

const register = async (req, res, next) => {
  res.set('content-type', 'application/json;charset=utf-8');
  const { username, password } = req.body;
  const findResult = await User.find(username);
  console.log(findResult);

  if (findResult) {
    res.render('error', { msg: JSON.stringify('该用户已存在') });
    return;
  }

  try {
    const pwdHash = await hash(password);
    let result = User.register(username, pwdHash);
    console.log(result);
    console.log(req.body);
  } catch (error) {
    res.render('error', { msg: JSON.stringify(error) });
  }

  res.render('success', { data: JSON.stringify({ username, password }) });
};

const userList = async (req, res, next) => {
  res.set('content-type', 'application/json;charset=utf-8');
  const data = (await User.userList()) || [];
  res.render('success', { data: JSON.stringify({ userList: data }) });
};

const deleteUser = async (req, res, next) => {
  const { username } = req.query;
  console.log('username: ', username);

  const findResult = await User.find(username);
  if (!findResult) {
    res.render('error', { msg: JSON.stringify('没有找到该用户') });
    return;
  }

  const result = await User.deleteUser(username);
  if (!result) {
    res.render('error', { msg: JSON.stringify('用户删除失败') });
    return;
  }

  res.render('success', { data: JSON.stringify('') });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.find(username);
  if (!user) {
    res.render('error', {
      msg: JSON.stringify('用户不存在'),
    });
    return;
  }

  const isEqual = await compare(password, user.password);
  if (!isEqual) {
    res.render('error', {
      msg: JSON.stringify('用户不存在'),
    });
    return;
  }

  // req.session.username = username;
  // console.log(req.session);

  const token = sign({ username }, 'plum');
  res.set('X-Access-Token', token);

  res.render('success', {
    data: JSON.stringify('登录成功'),
  });
};

const logout = (req, res, next) => {
  req.session = null;

  res.render('success', { data: JSON.stringify('退出登录成功') });
};

module.exports = {
  register,
  userList,
  deleteUser,
  login,
  logout,
};
