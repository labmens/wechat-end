"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const User_1 = require("./User");
exports.User = User_1.default;
// mongoose.connect
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', () => {
    console.error('连接未成功');
});
db.on('open', () => {
    console.log('连接成功!');
});
//# sourceMappingURL=index.js.map