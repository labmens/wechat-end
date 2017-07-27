"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
var router = express.Router();
exports.router = router;
router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});
router.post('/login', (req, res, next) => {
    // console.log(req);
    res.send('2323');
});
//# sourceMappingURL=users.js.map