var express = require('express');
var router = express.Router();
const { register, userList, deleteUser, login, logout } = require('../controllers/users');

const auth = (req, res, next) => {
  if (req.session?.username) {
    next();
  } else {
    res.render('error', {
      msg: JSON.stringify('请登录'),
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
