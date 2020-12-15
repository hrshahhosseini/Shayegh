const db = require(`../../../database/index`)
class DashboardModel {
    constructor() { }
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

}


module.exports = new DashboardModel;