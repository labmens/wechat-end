import * as express from 'express';
import * as passport from 'passport';
import * as User from '../models/User';
import { Request, Response, NextFunction } from "express";

var router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  res.send('respond with a resource');
});

router.post('/login', (req, res, next) => {
  // console.log(req);
  res.send('2323');
})

// module.exports = router
// export default router;
export {
  router
}

