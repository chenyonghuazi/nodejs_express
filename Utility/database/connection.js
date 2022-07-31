const mysql = require('mysql')

//解决方案 这个包对mysql8.0没有进行适配，如果你的mysql版本在8.0及以上做以下 
//CREATE USER 'test'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
//Grant all on pythonmysql.* To 'test'@'localhost';

const db = mysql.createPool({

    host: '127.0.0.1',
    user: 'test',
    password: '123456',
    database: 'pythonmysql'

})

module.exports.db = db
