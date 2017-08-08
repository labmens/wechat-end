import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId

/**
 * 信息表
 * 与发送者一对一, 与被发送者一对一 被发送者可以是人或者一个群
 * 
 * 发送的信息类型
 * 
 */

const chatSchema = new mongoose.Schema({
  dispatcher: ObjectId,
  receiver: ObjectId,
  message: String,
  type: String
}, {timestamps: true})

const Chats = mongoose.model('Chats', chatSchema);

export default Chats;