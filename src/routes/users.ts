import * as express from 'express';
import * as passport from 'passport';
import * as User from '../models/User';
import * as userCtrl from '../controllers/users/profile';
import { Request, Response, NextFunction } from "express";

var router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  res.send('respond with a resource');
});

// 登入
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.json({
    message: '登入成功'
  })
})

//注册
router.post('/signUp', (req, res, next) => {
  userCtrl.signUp(req, res, next)
});

export {
  router
}

