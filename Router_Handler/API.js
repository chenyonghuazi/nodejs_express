const path = require('path')
const mysql = require('../Utility/database/connection') //读取数据库链接方式
const bcrypt = require('bcrypt') //对密码进行加密 和 密码对比

const joi = require('joi') //规范规则的包
const jwt = require('jsonwebtoken') //生成Token的包
const config = require('../Utility/tokenConfig/config') //Token配置


//处理注册用户的函数
exports.reguser = (req, res)=> {
    
    const regInfo = req.body

    const sql = "select * from ev_users where username=?"

    //查询数据库是否有相同的用户名
    mysql.db.query(sql,regInfo.username, (err,results)=>{
        
        if(err){
            return res.cc(err)
        }
        if(results.length > 0){
            
            return res.cc("用户名被占用,请更换其他用户名")
        }
        
        //用户名可用 

        //密码加密
        regInfo.password = bcrypt.hashSync(regInfo.password,10)

        const insertSQL = "Insert into ev_users set ?"

        //插入到数据库
        mysql.db.query(insertSQL,{username:regInfo.username,password:regInfo.password},(err,results)=>{
            if(err) return res.cc(err)

            //判断有没有执行成功
            if(results.affectedRows != 1) return res.send({status:1,message:'注册用户失败,请稍后再试!'})

            res.cc("注册成功!",0)
        })

    })
}

//处理用户登录的函数
exports.login = (req, res)=> {

    const loginInfo = req.body

    const sqlQuery = "select * from ev_users where username=?"

    mysql.db.query(sqlQuery,loginInfo.username,(err,results)=>{

        //执行失败 处理
        if(err) return res.cc(err)

        //执行sql语句成功,但是获取到的数据条数不等于1
        if(results.length !== 1) return res.cc('用户名不存在,登录失败!')

        //密码对比
        const compareResult = bcrypt.compareSync(loginInfo.password,results[0].password)

        //结果为false 密码错误！
        if(!compareResult){
            return res.cc('密码错误,登录失败!')
        }else{ //在服务器端生成token 以保持用户登录状态(取代了session和cookie(不安全))

            //生成Token字符串的时候，要剔除密码和头像值等敏感信息

            //使用ES6高级语法
            const user = {...results[0], password:'', user_pic:''} //覆盖掉原有的password和userpic

            //生成Token字符串
            const tokenStr = jwt.sign(user,config.jwtSecretKey,{
                expiresIn:'10h', //有效期为小时则 xxh, 秒则 xxs, 天则 xxd
            })

            //将生成的Token字符串响应给客户端
            const options = {
                headers:{
                    Authorization: 'Bearer ' + tokenStr //为了方便客户端使用Token，在服务器端直接拼接上 Bearer 的前缀
                }
            }
            console.log('ok')
            //res.sendFile(path.resolve(__dirname + '/../pages/index.html'))
            //res.header('Authorization','Bearer ' + tokenStr).sendFile(path.resolve(__dirname + '/../pages/index.html'))
            res.send({
                status:0,
                message:'登录成功!',
                token: 'Bearer ' + tokenStr 
            })
        }

        //
    })
}




