"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const session = require("express-session");
const expressValidator = require("express-validator");
const passport = require("passport");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("./models");
require("./config/passport");
const users_1 = require("./routes/users");
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
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
app.use('/user', users_1.router);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
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
});
app.listen(3000);
exports.default = app;
//# sourceMappingURL=server.js.map