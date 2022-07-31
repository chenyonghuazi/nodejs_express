const joi = require('joi')

const usernameSchema = joi.string().alphanum().min(1).max(10).required()
const passwordSchema = joi.string().pattern(/^[\S]{6,12}$/).required()    


exports.schema = {
    body: {
        username:usernameSchema,
        password:passwordSchema
    }
}

const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

exports.update_userInfo_schema = {
    body:{
        Id:id,
        nickname:nickname,
        email:email
    }
}

exports.update_password_schema = {
    body:{
        oldPwd:passwordSchema,

        //joi.ref('oldPwd') 表示newPwd的值 必须和oldPwd的值保持一致
        //joi.not（） 表示不一致
        //joi.concat() 拼接
        newPwd:joi.not(joi.ref('oldPwd')).concat(passwordSchema)
    }
}

const avatar = joi.string().dataUri().required()

exports.update_avatar_schema = {
    body:{
        avatar,
    }
}