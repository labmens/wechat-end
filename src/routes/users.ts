import * as express from 'express';
import * as passport from 'passport';
import * as userCtrl from '../controllers/users/profile';
import { Request, Response, NextFunction } from "express";

var router = express.Router();

// 登入
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.json({
    message: '登入成功'
  });
})

//注册
router.post('/signUp', (req, res, next) => {
  userCtrl.signUp(req, res, next)
});

router.get('/logout', (req, res) => {
  userCtrl.logout(req, res);
});

router.post('/addContacts', (req, res, next) => {
  userCtrl.addContacts(req, res, next);
})

router.get('/contacts', (req, res, next) => {
  userCtrl.getContacts(req, res, next);
})

export {
  router
}

