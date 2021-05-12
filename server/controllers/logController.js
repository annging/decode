let async = require('async');
let bodyParser = require('body-parser');

// 由 POST 处理登录
exports.log_in_post = async (req, res, next) => {
    const { username, password } = req.body;
    const result = { code: 1000, message: '' };
    if (username && password) {
        const isUser = username === 'abcefg' && password === 'abciloveefg';
        if (isUser) {
            req.session.userInfo = { username, password }; // 登陆成功 设置 session
            result.code = 200;
            result.message = '登陆成功';
        } else {
            result.code = 1001;
            result.message = '账号或密码错误';
            req.session.destroy();
        }
    } else {
        result.message = '请输入合法的用户名或密码!';
    }
    res.send(JSON.stringify(result));
};

exports.log_out_get = async (req, res, next) => {
    req.session.username = null;
    res.edn(JSON.stringify({
        code: '200',
        message: '退出成功'
    }));
};