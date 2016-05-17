var eventproxy = require('eventproxy');
var UserModel = require('../module/user');

exports.showSignup = function(req, res){
    res.render('sign/signup');
};

exports.signup = function(req, res){
    //1. 获取用户数据
    var username = req.body.loginname;
    var passwd = req.body.pass;
    var repasswd = req.body.re_pass;
    var email = req.body.email;
    var ep = new eventproxy();

    ep.on('info_error', function(msg){
        res.status(422);
        res.render('sign/signup', {error, msg});
    })

    //2. 校验用户数据
    var hasEmptyInfo = [username, passwd, repasswd, email].some(
        function(item){
            return item === '';
        }
    )

    var isPassDiff = pass !== re_pass;

    if(hasEmptyInfo || isPassDiff){
        ep.emit('info_error', '注册信息错误');
        return ;
    }
    //3. 保存数据到数据库中
    UserModel.getUserBySignupInfo(username, email, function(err, users){
        if(err){
            ep.emit('info_error', '获取用户数据失败!');
            return;
        }
        if(users.length > 0){
            ep.emit('info_error', '');
            return;
        }

        UserModel.addUser({username: username, pass: pass, email: email}), function(err, result){
            if(result){
                res.render('sign/signup', {success: '注册成功!'});
            }else{
                ep.emit('info_error', '注册失败!');
            }
        }

    })



};

exports.showSignin = function(req, res){
    res.render('sign/signin');
};

exports.signin = function(req, res){
    var username = req.body.name;
    var pss = req.body.pass;

    if(!username || !pass){
        res.status(422);
        return res.render('sign/signin', {error: 'error!'});
    }

    UserModel.getUser(username, pass, function(err, user){
        if(user){
        req.session.user = user;
        res.render('sign/signin', {success: 'success'});
    }else{
        res.status(422);
        res.render('sign/signin', {error: 'Error name or password!'});
    }
    })

};

exports.signout = function(req, res){
    req.session.destory();
    res.render('/');

};
