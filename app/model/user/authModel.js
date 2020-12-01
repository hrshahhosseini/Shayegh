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
    async findUserByEmail(req) {
        const [result] = await db.query(`
        select * from users where email=? limit 1` , [req.body.email])
        return result
    }

    async insertUser(req) {
        let newUser = {
            // name: req.body.name , 
            // lastName : req.body.lastName,
            full_name: req.body.full_name,
            email: req.body.email,
            // phoneNumber :req.body.phoneNumber,
            password: req.body.password
        }
        const [result] = await db.query(`
        insert into users set ? ` , newUser)
        return result
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
        console.log(result[0].changedRows)
        return result[0].changedRows
    }
    async updateUserPasswordForReset(req, email) {
        const result = await db.query(`
        update users set password = ?
        where email = ?
        ` , [req.body.newPass, email])
        return result[0].changedRows
    }
}

module.exports = new login