const model = require(`../../model/user/dashboardModel`)
class DashboardController {
    constructor() { }

    async createGroup(req, res) {
        const result = await model.newGroup(req, `team`, ``, ``)
        return res.send({ message: `group ${result} created ...` })
    }

    async addToGroup(req, res) {
        const result = await model.addUser(req, `users`, [], `email`)
        return res.send({ message: `olla` })
    }

    async wallet(req, res) {
        const result = await model.chargeWallet(req)
        return result > 0 ? res.redirect(`/dashboard`) : res.redirect(`/dashboard/wallet/wallet-charge`)
    }



}


module.exports = new DashboardController;