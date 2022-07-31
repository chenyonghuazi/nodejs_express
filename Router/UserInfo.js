const express = require('express')
const router = express.Router()
const userInfo_handler = require('../Router_Handler/UserInfo')
const multer = require('multer')

//获取用户基本信息 Token里有一点信息 由此去数据库搜索
router.get('/userInfo',userInfo_handler.userInfo)

//用户名和密码的规则
const schema  = require('../Utility/validation/user')
//封装joi.validate过程的包
const expressJoi = require('@escook/express-joi')
const { append } = require('express/lib/response')
//更新用户信息
router.post('/userInfo',expressJoi(schema.update_userInfo_schema),userInfo_handler.updateUserInfo)


//更新密码的路由
router.post('/updatePwd',expressJoi(schema.update_password_schema),userInfo_handler.updatePwd)

//更新用户头像的处理函数
router.post('/update/avatar',expressJoi(schema.update_avatar_schema),userInfo_handler.updateAvatar)

//用户上传图片
var upload = multer({dest:'upload/'})
router.post('/uploadAvatar', upload.single('logo'),userInfo_handler.updateAvatar2)

//验证Token接口
router.get('/vertify',userInfo_handler.vertifyToken)
module.exports = router