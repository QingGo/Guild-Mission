const express = require('express');
const router = express.Router();

const User = require('../models/user')

//利用中间件方法对统一返回格式进行配置，每次路由进入对返回格式做初始化处理
var responseData
router.use((req,res,next) => {
    // console.log(req)
    responseData = {
        code: 0, //默认0，代表无任何错误
        message: ''  //错误信息
    }
    next()
})
router.get('/', (req, res) => {
    res.json(responseData)
})

router.post('/user/register', (req, res) => {
  //由于入口文件已经配置过body-parser，因此req.body可以获取客户端提交过来数据
  
  var username = req.body.username
  var password = req.body.password
  var repassword = req.body.repassword
  //用户名不能为空
  if (username == '') {
      responseData.code = 1
      responseData.message = '用户名不能为空'
      //只要一出错了，不继续执行逻辑，将对象转成json格式并返回前端
      res.json(responseData)
      return
  }
  //密码不能为空
  if (password == '') {
      responseData.code = 2
      responseData.message = '密码不能为空'
      res.json(responseData)
      return
  }
  //两次输入密码必须一致
  if (password != repassword) {
      responseData.code = 3
      responseData.message = '两次输入密码必须一致'
      res.json(responseData)
      return
  }
  /**
   * 用户是否已经被注册 => 数据库查询操作
   * findOne返回的是Promise对象，第一个参数：查询条件
   */
  User.findOne({
      username: username
  }).then((userInfo) => {
      if (userInfo) {
          //表示数据库中有该记录
          responseData.code = 4
          responseData.message = '用户名已经被注册了'
          res.json(responseData)
          return
      }
      /**
       * 一条记录代表一个对象，先通过构造函数创建一个新的用户对象
       * 再将对象保存到数据库中，save返回的也是Promise方法
       */
      var user = new User({
          username: username,
          password: password
      })
      return user.save()
  }).then((newUserInfo) => {
      responseData.message = '注册成功'
      res.json(responseData)
  })
})

router.post('/user/login', (req, res) => {
  var username = req.body.username
  var password = req.body.password
  //用户名和密码不能为空
  if (username == '' || password == '') {
      responseData.code = 1
      responseData.message = '用户名和密码不能为空'
      res.json(responseData)
      return
  }
  //从数据库中去查询相同用户名和密码的记录是否存在，两者保持一致
  User.findOne({
      username: username,
      password: password
  }).then((userInfo) => {
      if (!userInfo) {
          responseData.code = 2
          responseData.message = '用户名或密码错误'
          res.json(responseData)
          return
      }
      responseData.message = '登录成功'
      //自增加一些需要的数据返回前端，进行页面回显或其他展示
      responseData.userInfo = {
          _id: userInfo._id,
          username: userInfo.username
      }
      //发送cookies信息给浏览器保存，之后都会存在Request Header头部Cookies中
      req.cookies.set('userInfo', JSON.stringify(responseData.userInfo))
      res.json(responseData)
  })
})

router.get('/user/logout', (req, res) => {
  responseData.message = '退出成功'
  req.cookies.set('userInfo', null)
  res.json(responseData)
})

module.exports = router;
  