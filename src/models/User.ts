import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

// export type UserModel = mongoose.Document & {

// }
/**
 * 创建用户表, 保存好友的id, => 这个需要考虑下 到底是通过外键关联 还是直接存一个数组
 * 然后还有用户发送的信息, 这个还得重新考虑下 用户和发的信息是一对多  信息与发送的对象应该是一对多(考虑到群组)
 * 就是要解决这两个问题
 */

const userSchema = new mongoose.Schema({
  email: String,
  username: {
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
  },
  friends: [{
    type: 'ObjectId',
    ref: 'User'
  }]
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
    bcrypt.hash(user.password, salt, undefined, (err:mongoose.Error, hash) => {
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
