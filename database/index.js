const mysql = require(`mysql2`)

// const connection = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     port: process.env.MYSQL_PORT,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// })

const connection = mysql.createPool({
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD
})


// connection.connect((err) => {
//     if (!err)
//         console.log(`${process.env.MYSQL_DATABASE} database is working properly ...`)
//     else console.log(err)
// })
module.exports = connection.promise()