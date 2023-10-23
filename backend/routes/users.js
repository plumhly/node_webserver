var express = require('express');
var router = express.Router();
const { register, userList, deleteUser, login, logout } = require('../controllers/users');
const { verify } = require('../utils/encript');

const auth = (req, res, next) => {
  const token = req.get('X-Access-Token');
  if (!token) {
    res.render('error', {
      msg: JSON.stringify('请登录'),
    });
    return;
  }

  try {
    const payload = verify(token, 'plum');
    next();
  } catch (error) {
    res.render('error', {
      msg: JSON.stringify('token无效'),
    });
  }
};

/* GET users listing. */
router.post('/register', register);
router.get('/list', auth, userList);
router.delete('/deleteUser', auth, deleteUser);
router.post('/login', login);
router.post('/logout', auth, logout);

module.exports = router;
