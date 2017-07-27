"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
// export type UserModel = mongoose.Document & {
// }
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    phone: Number,
    createDate: Date,
    profile: {
        name: String,
        sex: String,
        age: Number,
        picture: String
    }
}, { timestamps: true });
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
userSchema.statics.findByUsername = function (username, cb) {
    return this.find({
        username,
    }, cb);
};
userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hsah(user.password, salt, undefined, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
const User = mongoose.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map