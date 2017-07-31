import * as mongoose from 'mongoose';
import User from './User';

// mongoose.connect
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', () => {
  console.error('连接未成功');
});
db.on('open', () => {
  console.log('连接成功!')
})

export {
  User
}