"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../models/User");
function signUp(req, res, next) {
    req.assert('password', 'Password must be at least 4 characters long').len({ min: 4 });
    req.assert('confimPassword', "Passwords not match").equals(req.body.password);
    let error;
    req.getValidationResult().then(result => {
        error = result.useFirstErrorOnly();
    });
    if (error) {
        res.json(error);
    }
    const user = new User_1.default({
        username: req.body.username,
        password: req.body.password
    });
    User_1.default.findOne({
        username: req.body.username
    }, (err, exitUser) => {
        if (err) {
            return next(err);
        }
        if (exitUser) {
            res.json({
                message: '用户名已存在'
            });
        }
        user.save(err => {
            if (err) {
                return next(err);
            }
            res.Json({
                message: '注册成功'
            });
        });
    });
}
exports.signUp = signUp;
function logout(req, res) {
    console.log(req.logout);
    req.logout();
    res.json({
        message: '成功退出'
    });
}
exports.logout = logout;
//# sourceMappingURL=profile.js.map