import * as express from 'express';
import * as session from 'express-session';
import * as expressValidator from 'express-validator';

import * as passport from 'passport';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import './models';
import './config/passport';
import { router as users } from './routes/users'

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(expressValidator());
app.use(cookieParser());

app.use(session({
  secret: 'mmmmpc',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 36000
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
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
})

app.listen(3000);

export default app;
