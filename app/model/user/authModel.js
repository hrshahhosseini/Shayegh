const db = require(`../../../database`)
class login {
    constructor() { }
    async find(columns = [], table) {
        const lookFor = columns.length > 0 ? columns.join(`,`) : `*`
        const [result] = await db.query(`
        select ${lookFor} from ${table}`)
        return result
    }

    async findUser(req) {
        const [result] = await db.query(`
        select * from users where password=? and email=? limit 1` , [req.body.password, req.body.email])
        return result
    }

    async findUser1(req) {
        const [result] = await db.query(`
        select * from users where email=? limit 1` , [req.body.email])
        return result
    }

    async findUserByEmail(req) {
        const [result] = await db.query(`
        select * from users where email=? limit 1` , [req.body.email])
        return result
    }

    async insertUser(req) {
        let newUser = {
            // name: req.body.name , 
            email: req.body.email,
            // lastName : req.body.lastName,
            // phoneNumber :req.body.phoneNumber,
            password: req.body.password
        }
        const [result] = await db.query(`
        insert into users set ? ` , newUser)
        const [mainResult] = await db.query(`
        select * from users
        where id = ?
        limit 1` , [result.insertId])
        return mainResult
    }
    async findOneForReset(columns = [], table, option) {
        const lookFor = columns.length > 0 ? columns.join(`,`) : `*`
        const [result] = await db.query(`
        select ${lookFor} from ${table} where email = ?
        limit 1` , option)
        return result
    }
    async updateUserResetLinkForReset(req, token) {
        const result = await db.query(`
        update users set resetLink = ? 
        where email = ?` , [token, req.body.email])
        return result[0].changedRows
    }
    async updateUserPasswordForReset(req, email) {
        const [result] = await db.query(`
        update users set password = ?
        where email = ?
        ` , [req.body.newPass, email])
        return result[0].changedRows
    }


    async update(req, table, fields = [], options) {
        const [result] = await db.query(`
        update ${table} set  ${fields[0]}=?
        where  = ? ` , [options])
        return result;
    }


    async delete(req, table, fields = [], options) {
        const [result] = await db.query(`
        delete from ${table}
        where ??
        ` , )
        return result.affectedRows > 0
    }

    async findOne(req, table, fields = [], options) {
        const lookFor = fields.length > 0 ? fields.join(`,`) : `*`
        const [result] = await db.query(`
        select ${lookFor} from ${table} 
        where  =?
        limit 1` , [options])
        return result
    }

    async insert(req, table, fields = [], options) {  //  ?
        const myData = { password: req.password } //
        const result = await db.query(`
        insert into ${table}  
        values set ?` , myData)
        return result.insertId
    }

}



module.exports = new login