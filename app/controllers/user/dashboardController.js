const model = require(`../../model/user/dashboardModel`)
class DashboardController {
    constructor() { }

    async createGroup(req, res) {
        const result = await model.newGroup(req, `team`, ``, ``)
        return result == 1 ? res.status(400).json({ success: false, message: `you already have a group` }) : //  ...
            res.status(200).json({ success: true, message: `success` }) //`${result.affectedRows} group created ...`
    }

    async addToGroup(req, res) {
        const result = await model.addUser(req, `users`, [], `email`)
        return result == 1 ? res.status(200).json({ success: true, message: `success` }) :
            result == 2 ? res.status(400).json({ success: false, message: `you can't add user to the group ... access denied!` }) : // 
                res.status(400).json({ success: false, message: `user is another group's participant ...` }) // ``
    }

    async remove(req, res) {
        const result = await model.removeUser(req, `users`, [], `email`)
        return result == 2 ? res.status(400).json({ success: false, message: `you can't remove user from the group ... access denied` }) : // `
            result == 3 ? res.status(400).json({ success: false, message: `user is not in your group` }) : // ``
                res.status(200).json({ success: true, message: `success` })
    }

    async removeGroup(req, res) {
        const result = await model.removeGroup(req, `users`, [], ``)
        return result == 2 ? res.status(400).json({ success: false, message: `you can't remove the group ... access denied` }) : // `
            result == 3 ? res.status(400).json({ success: false, message: `sth went wrong , group name doesn't exists in team table` }) : // ``
                res.status(200).json({ success: true, message: `success` })
    }
    //  ---- wallet ----
    async wallet(req, res) {
        const result = await model.chargeWallet(req)
        return result > 0 ? res.status(200).send({ success: true, message: `success` }) :
            res.status(400).json({ success: false, message: `something went wrong. please contact us` })
            , console.log(result) // `
    }

    async requestCharge(req, res) {
        const result = await model.findOneById(req, `users`, ``, `id`)
        const token = jwt.sign({ email: result[0].email, amount: req.body.amount }, process.env.CHARGE_REQUEST_SECRET, { expiresIn: `10m` })
        mailService.mail(req, token)
        return res.status(200).json({ success: true, message: `success` })
    }

    async requestChargeShow(req, res) {
        const token = req.params.token
        const encodedData = jwt.verify(token, (process.env.CHARGE_REQUEST_SECRET))
        return res.status(200).json({ true: 1000, message: `success` })
    }

    async requestChargeDo(req, res) {
        const token = req.params.token
        const encodedData = jwt.verify(token, (process.env.CHARGE_REQUEST_SECRET))
        if (req.body.confirm == true) {
            const result = await model.transition(req, encodedData)
            if (result == 1.1) return res.status(400).json({ success: false, message: `موجودی حساب شما کافی نیست` })
            return res.status(200).json({ success: true, message: `success` })
        } else {
            console.log(`err`)
        }

    }

    // ---- dashboard ----
    async dashboard(req, res) {
        const result = await model.findOneById(req, `users`, [`id`, `username`, `name`, `lastName`, `email`, `phoneNumber`, `createdAt` , `team` , `walletAmount`], `id`)
        return res.json({ success: true, user: result[0] })
    }

}


module.exports = new DashboardController;