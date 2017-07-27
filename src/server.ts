import * as express from 'express';
import * as session from 'express-session';

import * as passport from 'passport';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import './models';
import { router as users } from './routes/users'

const app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use(session({
  secret: 'mmmmpc',
  cookie: {
    maxAge: 3600
  }
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', users)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err: { status?: number, message: string } = new Error('Not Found');
  err.status = 404
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  console.log(123)
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json({
    message: err.message,
    error: err
  });
})

app.listen(3000);

export default app;
