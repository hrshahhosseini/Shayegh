const mysql = require(`mysql2`)


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 60 * 60 * 1000,
    queueLimit: 0
})
// const connection = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     port: process.env.MYSQL_PORT,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// })


// connection.connect((err) => {
// if(!err)
//     console.log(`${process.env.MYSQL_DATABASE} database is working properly ...`)
// })
module.exports = pool.promise()