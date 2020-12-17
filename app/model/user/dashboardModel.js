const db = require(`../../../database/index`)
class DashboardModel {
    constructor() { }
    //  ----- group ------
    async newGroup(req, table, fields, options) {
        const [result] = await this.insert(req, table, fields, options)
        await this.update2(req)
        return result.affectedRows
    }


    async addUser(req, table, fields, options) {
        const [findResult] = await this.findOne(req, table, fields, options)
        if (findResult !== undefined) {
            await this.update(req)
            return 1
        }
        return 0
    }




    async insert(req, table, fields = [], options) {  //  ?
        const result = await db.query(`
        insert into ${table}  
        set ?` , { groupName: req.body.groupName })
        return result
    }
    async update(req) {
        const [result] = await db.query(`
        update users set team =?
        where email = ? `, [req.user.team, req.body.email])
        return result;
    }
    async findOne(req, table, fields = [], options) {
        const lookFor = fields.length > 0 ? fields.join(`,`) : `*`
        const [result] = await db.query(`
        select ${lookFor} from ${table} 
        where ${options} =?
        limit 1` , [req.body.email])
        return result
    }
    async update2(req) {
        const [result] = await db.query(`
        update users set team =?
        where id = ? `, [req.body.groupName, req.user.id])
        return
    }
    //  ----- wallet -----
    async chargeWallet(req) {
        const [result1] = await db.query(`
        select walletAmount from users
        where id = ?
        limit 1`, [req.user.id])
        const sumAmount = Number(Object.values(result1[0])[0]) + Number(req.body.amount)
        const [result] = await db.query(`
        update users set walletAmount = ?
        where id = ?` , [sumAmount.toString(), req.user.id])
        return result.affectedRows
    }

}


module.exports = new DashboardModel;