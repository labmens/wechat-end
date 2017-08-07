"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const userCtrl = require("../controllers/users/profile");
var router = express.Router();
exports.router = router;
// 登入
router.post('/login', passport.authenticate('local'), (req, res, next) => {
    res.json({
        message: '登入成功'
    });
});
//注册
router.post('/signUp', (req, res, next) => {
    userCtrl.signUp(req, res, next);
});
router.get('/logout', (req, res) => {
    userCtrl.logout(req, res);
});
router.post('/addContacts', (req, res, next) => {
    userCtrl.addContacts(req, res, next);
});
//# sourceMappingURL=users.js.map