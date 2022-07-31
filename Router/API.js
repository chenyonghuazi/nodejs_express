const express = require('express')

const router = express.Router()

const user_handler = require('../Router_Handler/API')

//用户名和密码的规则
const schema = require('../Utility/validation/user')
//封装joi.validate过程的包
const expressJoi = require('@escook/express-joi')
router.post('/reguser',expressJoi(schema.schema),user_handler.reguser)

router.post('/login',expressJoi(schema.schema),user_handler.login)


module.exports = router