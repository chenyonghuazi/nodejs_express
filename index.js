const express = require('express')


const app = express()

app.use(express.static('static'))

const cors = require('cors')
//app.use(cors())

app.use(express.json()) //Used to parse JSON bodies
app.use(express.urlencoded({extended:false})) //Parse URL-encoded bodies

//处理错误信息的函数的中间件
app.use((req,res,next)=>{
    res.cc = function(err,status = 1){
        res.send({
            status,
            message:err instanceof Error ? err.message : err
        })
    }
    next()
})

//在路由之前配置解析Token的中间件
const expressJWT = require('express-jwt')
const config = require('./Utility/tokenConfig/config')
//配置解析Token中间件
app.use(expressJWT({secret:config.jwtSecretKey,algorithms: ['HS256']}).unless({path:[/^\/api/,/^\/home/,/^\/pages\/login/,/^\/my\/uploadAvatar/]})) //除api接口以外所有接口都需要Token验证

const apiRouter = require('./Router/API')
app.use('/api',apiRouter)


const pagesRouter = require('./Router/Pages')
app.use('/',pagesRouter)

const userInfoRouter = require('./Router/UserInfo')
app.use('/my',userInfoRouter)

const joi = require('joi') //导入验证规则joi包
//错误中间件
app.use(function(err,req,res,next){

    if(err instanceof joi.ValidationError) return res.cc(err) //截取joi包的错误以防止服务器终止
    if(err.name == 'UnauthorizedError') {
        console.log('Token验证失败')
        return res.cc(err) //截取express-jwt包的错误以防止服务器终止
    }
    res.cc(err)
})

app.listen(80, ()=>{
    console.log(__dirname)
    console.log('express server running at http://127.0.0.1')
})