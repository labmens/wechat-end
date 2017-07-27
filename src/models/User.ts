import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

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
}, {timestamps: true})

userSchema.methods.comparePassword = function(candidatePassword: string, cb: (err: any, isMatch: boolean) => {}) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

userSchema.statics.findByUsername = function(username: string, cb: (err?: any, user?: object, next?: any) => {}) {
  return this.find({
    username,
  }, cb);
}

userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrypt.hsah(user.password, salt, undefined, (err:mongoose.Error, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next()
    })
  })
})

const User = mongoose.model('User', userSchema);

export default User;
