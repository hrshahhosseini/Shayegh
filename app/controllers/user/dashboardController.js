const model = require(`../../model/user/dashboardModel`)
class DashboardController {
    constructor() { }

    async createGroup(req, res) {
        const result = await model.newGroup(req, `team`, ``, ``)
        return res.send({ message: `group ${result} created ...` })
    }

    async addToGroup(req, res) {
        const result = await model.addUser(req, `users`, [], `email`)
        return res.send({message:`olla`})
    }



}


module.exports = new DashboardController;