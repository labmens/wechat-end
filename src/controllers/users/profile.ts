import { Request, Response, NextFunction } from "express";

import { default as User } from '../../models/User';

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * 
 * 注册
 */
export function signUp(req, res, next) {
  req.assert('password', 'Password must be at least 4 characters long').len({min: 4});
  req.assert('confimPassword', "Passwords not match").equals(req.body.password);

  let error;
  req.getValidationResult().then(result => {
    error = result.useFirstErrorOnly();
  })
  if (error) {
    res.json(error)
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password
  })

  User.findOne({
    username: req.body.username
  }, (err, exitUser) => {
    if (err) {
      return next(err)
    }
    if (exitUser) {
      res.json({
        message: '用户名已存在'
      })
    }
    user.save(err => {
      if (err) {
        return next(err);
      }
      res.json({
        message: '注册成功'
      })
    })
  })
}

export function logout(req, res) {
  console.log(req.logout);
  req.logout();
  res.json({
    message: '成功退出'
  })
}

/**
 * 添加好友
 * @params username
 * 
 * 从cookie当中获取到sessionId 然后获取到用户信息, 查看是否已经是好友了
 * 如果不是好友就继续操作
 * @return
 */

 export function addContacts(req, res: Response, next: NextFunction) {
  const _username = req.body.username;
  const _id = req.user.id;
  if (!_username) {
    let err = new Error('请输入联系人用户名!')
    res.json(err)
  }

  User.findOne({
    _id
  }, (err, user) => {
    if (err) {
      return next(err)
    }
    User.findOne({
      username: _username
    }, '_id', (err, person) => {
      if (err) {
        return next(err)
      }
      if (!person) {
        return res.json({
          message: '该用户不存在'
        })
      }
      user.friends.push(person._id)
      user.save(err => {
        if (err) {
          return next(err)
        }
        return res.json({
          message: '添加成功'
        });
      })
    })
  
  })
 }

 /**
  * 获取所有的好友
  * 
  */

  export function getContacts(req, res, next) {
    const _id = req.user.id
    User.findOne({
      _id
    }).populate({
      path: 'friends',
      select: '-password -friends'
    }).exec((err, person) => {
      if (err) {
        res.status(500)
        return res.json({
          error: err
        })
      }
      return res.json(person.friends)
    })
  }