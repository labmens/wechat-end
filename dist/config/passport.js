"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_local_1 = require("passport-local");
const models_1 = require("../models");
passport.serializeUser((user, done) => {
    done(undefined, user.id);
});
passport.deserializeUser((id, done) => {
    models_1.User.findById(id, (err, user) => {
        done(err, user);
    });
});
passport.use(new passport_local_1.LocalStrategy(function (username, password, done) {
    models_1.User.findOne({
        username
    }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(undefined, false, {
                message: `username ${username} not found`
            });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, {
                message: 'Invalid username or password'
            });
        });
    });
}));
//# sourceMappingURL=passport.js.map