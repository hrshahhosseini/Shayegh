const db = require(`../../../database/index`)
class DashboardModel {
    constructor() { }
    //  ----- group ------
    async newGroup(req, table, fields, options) {
        const [team] = await db.query(`select team from users where id = ? limit 1`, [req.user.id])
        if (team[0].team !== null) {
            return 1
        }
        else {
            const [result] = await this.insert(req, table, fields, options)
            await this.update2(req)
            await db.query(`update users set role = 2 where id = ?`, [req.user.id])
            return result
        }
    }


    async addUser(req, table, fields, options) {
        const [findResult] = await this.findOne(req, table, fields, options)
        const [role] = await db.query(`select role from users where id = ? limit 1`, [req.user.id])

        if (findResult.team !== null)
            return 3 //`user is another group's participant ...`

        else if (role[0].role !== 2)
            return 2 //`you can't add user to the group ...`
        else if (findResult !== undefined) {
            await this.update(req)
            if (req.body.role = 1) await db.query(`update users set role = 1 where email = ?`, [req.body.email])
            else if (req.body.role = 0) await db.query(`update users set role = 0 where email = ?`, [req.body.email])

            return 1
        }
        return 0
    }

    async removeUser(req, table, fields, options) {
        const [role] = await db.query(`select role from users where id = ? limit 1`, [req.user.id])
        const [team] = await db.query(`select team from users where id = ? limit 1`, [req.user.id])

        const [findResult] = await this.findOne(req, table, fields, options)
        if (role[0].role !== 2)
            return 2 //`you can't remove user from the group ...`
        else if (team[0].team == findResult.team) {
            const [result] = await db.query(`update users set team = ?
            where email = ?
            ` , [null, req.body.email])
            await db.query(`update users set role = 0
            where email = ?` , [req.body.email])
            return result
        }
        else
            return 3 //`user is not in your group`
    }

    async removeGroup(req, table, fields, options) {
        const [role] = await db.query(`select role from users where id = ? limit 1`, [req.user.id])
        const [team] = await db.query(`select team from users where id = ? limit 1`, [req.user.id])
        if (role[0].role !== 2)
            return 2 //`you can't remove the group ...`


        const [result1] = await db.query(`update ${table} set role = -1
        where team = ?` , [team[0].team])
        const [result3] = await db.query(`delete from team 
        where groupName = ? `, [team[0].team])
        const [result2] = await db.query(`update ${table} set team = NULL
        where team = ?` , [team[0].team])
        if (result3.affectedRows < 1) return 3 //sth went wrong , group name doesn't exists in team table
        return result2
    }




    async insert(req, table, fields = [], options) {  //  ?
        const result = await db.query(`
        insert into ${table}  
        set ?` , { groupName: req.body.groupName })
        return result
    }
    async update2(req) {
        const [result] = await db.query(`
        update users set team =?
        where id = ? `, [req.body.groupName, req.user.id])
        return
    }
    async update(req) {
        const [team] = await db.query(`select team from users where id = ? limit 1`, [req.user.id])

        const [result] = await db.query(`
        update users set team =?
        where email = ? `, [team[0].team, req.body.email])
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

    async transition(req, option) {
        const [result1] = await db.query(`
        select walletAmount from users
        where id = ?
        limit 1
        ` , [req.user.id])
        const minesAmount = Number(Object.values(result1[0])[0]) - Number(option.amount)
        if (minesAmount < 0) return 1.1
        const [result] = await db.query(`
        update users set walletAmount = ?
        where id = ?
        ` , [minesAmount.toString(), req.user.id])

        const [result3] = await db.query(`
        select walletAmount from users
        where email = ?
        limit 1
        ` , [option.email])
        const sumAmount = Number(Object.values(result3[0])[0]) + Number(option.amount)
        const [result4] = await db.query(`
        update users set walletAmount = ?
        where email = ?
        ` , [sumAmount, option.email])
        return [result.affectedRows, result4.affectedRows]
    }
}


module.exports = new DashboardModel;