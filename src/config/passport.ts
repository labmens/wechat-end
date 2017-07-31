import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import { User } from '../models';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      username
    }, (err, user: any) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(undefined, false ,{
          message: `username ${username} not found`
        })
      }
      user.comparePassword(password, (err: any, isMatch: boolean) => {
        if (err) {
          return done(err)
        }
        if (isMatch) {
          return done(undefined, user)
        }
        return done(undefined, false, {
          message: 'Invalid username or password'
        })
      })
    })    
  }
));
