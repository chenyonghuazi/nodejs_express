const path = require('path')
const mysql = require('../Utility/database/connection')
const jwt = require('jsonwebtoken')
const tokenconfig = require('../Utility/tokenConfig/config')

exports.homePage = (req,res)=>{
    //console.log(__dirname + '/../pages/index.html')
    //const token = window.localStorage.getItem('Authorization');
    // const token = req.header('authorization');
    // console.log(req.headers)
    // if(token){
    //     jwt.verify(token, tokenconfig.jwtSecretKey, function(err, decoded) {
    //         if(err) return res.cc(err)
    //         console.log('decoded')
    //         console.log(decoded)
    //     });
    // }
    res.sendFile(path.resolve(__dirname + '/../pages/index.html'))
}

exports.nextPage = (req,res)=>{
    const page = req.params.nextPage
    res.sendFile(path.resolve(__dirname + '/../pages/' + page))
}