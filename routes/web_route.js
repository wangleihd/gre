var express = require('express');
var router = express.Router();
var signController = require('../controllers/sign');

//显示注册页面
router.get('/signup', signController.showSignup);

//提交注册信息页面
router.post('/signup', signController.signup);

//显示登陆页面
router.get('/signin', signController.showSignin);

//提交登陆信息
router.post('/signin', signController.signin);

//登出功能
router.post('/signout', signController.signout);


module.exports = router;
