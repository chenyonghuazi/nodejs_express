const mysql = require('../Utility/database/connection')
const bcrypt = require('bcrypt')

//获取用户基础信息的处理函数
exports.userInfo = (req,res)=>{
    
    const sqlQuery = "select id,username,nickname,email,user_pic from ev_users where id=?" // 不查询密码

    mysql.db.query(sqlQuery,req.user.Id,(err,results)=>{
        if(err) return res.cc(err)

        if(results.length !== 1) return res.cc('获取信息失败!')

        res.send({
            status:0,
            message:'获取信息成功!',
            data:results[0]
        })
    })
}

//更新用户信息的处理函数
exports.updateUserInfo = (req, res)=>{

    const sqlQuery = "Update ev_users set ? where id = ?"

    mysql.db.query(sqlQuery,[req.body,req.user.Id],(err,results)=>{
        if(err) return res.cc(err)

        if(results.affectedRows !== 1) return res.cc('用户信息更新失败!')

        //更新成功
        res.send({
            status:0,
            message:'更新成功'
        })
    })
}

//更新用户密码
exports.updatePwd = (req,res) => {


    //首先查询一下是否存在该用户
    const sqlQuery1 = "select * from ev_users where id=?"

    mysql.db.query(sqlQuery1,req.user.Id,(err,results)=>{
        if(err) return res.cc(err)

        if(results.length !== 1) return res.cc('该用户不存在')

        //对比密码
        const compareResult = bcrypt.compareSync(req.body.oldPwd,results[0].password)

        if(!compareResult) return res.cc('旧密码错误!')

        //更新数据库的密码为新密码
        const sqlQuery2 = "Update ev_users set password=? where id=?"

        const newPwd = bcrypt.hashSync(req.body.newPwd,10)

        mysql.db.query(sqlQuery2,[newPwd,req.user.Id],(err,results)=>{
            if(err) return res.cc(err)

            if(results.affectedRows !== 1) return res.cc('更新密码失败')

            res.cc('成功更改密码',0)
        })
    })
}

//更新用户头像
exports.updateAvatar = (req,res) =>{
    
    const sqlQuery = "Update ev_users set user_pic=? where id=?"

    mysql.db.query(sqlQuery,[req.body.avatar,req.user.Id],(err,results)=>{
        if(err) return res.cc(err)

        if(results.affectedRows !== 1) return res.cc('更新失败')

        res.cc('更新成功',0)
    })
}

//上传用户头像信息到数据库
exports.updateAvatar2 = (req,res) => {
    var file = req.file;

    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);

    const sqlQuery = "Update ev_users set user_pic=? where id=?"

    mysql.db.query(sqlQuery,[file.path,req.user.Id],(err,results)=>{
        if(err) return res.cc(err)

        if(results.affectedRows !== 1) return res.cc('更新失败')

        res.cc('更新成功',0)
    })
}

//验证token的接口
exports.vertifyToken = (req, res) => {
    res.send({
        status: 0,
        message: 'Token works'
    })
}