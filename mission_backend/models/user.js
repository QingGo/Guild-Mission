const mongoose = require('mongoose');

userSchema = new mongoose.Schema({
    username: String,  //用户名
    password: String,   //密码
    //是否是管理员
    isAdmin: {
        type: Boolean,  //定义类型
        default: false  //设置初始注册用户默认都为非管理员
    }
})

module.exports = mongoose.model('User', userSchema)