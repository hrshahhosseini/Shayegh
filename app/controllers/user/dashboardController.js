const model = require(`../../model/user/dashboardModel`)
const mailService = require(`../../services/mailService-chargeRequest`)
const passport = require(`passport`)
const jwt = require(`jsonwebtoken`)
class DashboardController {
    constructor() { }

    async createGroup(req, res) {
        const result = await model.newGroup(req, `team`, ``, ``)
        return result == 1 ? res.status(400).json({ accessCode: 1008, message: `you already have a group` }) : //  ...
            res.status(200).json({ accessCode: 1000, message: `success` }) //`${result.affectedRows} group created ...`
    }

    async addToGroup(req, res) {
        const result = await model.addUser(req, `users`, [], `email`)
        return result == 1 ? res.status(200).json({ accessCode: 1000, message: `success` }) :
            result == 2 ? res.status(400).json({ accessCode: 1009, message: `you can't add user to the group ... access denied!` }) : // 
                res.status(400).json({ accessCode: 1010, message: `user is another group's participant ...` }) // ``
    }

    async remove(req, res) {
        const result = await model.removeUser(req, `users`, [], `email`)
        return result == 2 ? res.status(400).json({ accessCode: 1011, message: `you can't remove user from the group ... access denied` }) : // `
            result == 3 ? res.status(400).json({ accessCode: 1012, message: `user is not in your group` }) : // ``
                res.status(200).json({ accessCode: 1000, message: `success` })
    }

    async removeGroup(req, res) {
        const result = await model.removeGroup(req, `users`, [], ``)
        return result == 2 ? res.status(400).json({ accessCode: 1013, message: `you can't remove the group ... access denied` }) : // `
            result == 3 ? res.status(400).json({ accessCode: 1014, message: `sth went wrong , group name doesn't exists in team table` }) : // ``
                res.status(200).json({ accessCode: 1000, message: `success` })
    }

    async wallet(req, res) {
        const result = await model.chargeWallet(req)
        return result > 0 ? res.status(200).send({ accessCode: 1000, message: `success` }) :
            res.status(200).json({ accessCode: 1015, message: `something went wrong. please contact us` })
            , console.log(result) // `
    }

    async requestCharge(req, res) {
        const result = await model.findOneById(req, `users`, ``, `id`)
        const token = jwt.sign({ email: result[0].email, amount: req.body.amount }, process.env.CHARGE_REQUEST_SECRET, { expiresIn: `10m` })
        mailService.mail(req, token)
        return res.status(200).json({ accessCode: 1000, message: `success` })
    }

    async requestChargeShow(req, res) {
        const token = req.params.token
        const encodedData = jwt.verify(token, (process.env.CHARGE_REQUEST_SECRET))
        return res.status(200).json({ accessCode: 1000, message: `success` })
    }

    async requestChargeDo(req, res) {
        const token = req.params.token
        const encodedData = jwt.verify(token, (process.env.CHARGE_REQUEST_SECRET))
        if (req.body.confirm == true) {
            const result = await model.transition(req, encodedData)
            if (result == 1.1) return res.status(400).json({ accessCode: 1016, message: `` }) // `موجودی حساب شما کافی نیست
            return res.status(200).json({ accessCode: 1000, message: `success` })
        } else {
            console.log(`err`)
        }

    }



}

passport.serializeUser((user_id, done) => {
    done(null, user_id);
});
passport.deserializeUser((user_id, done) => {
    done(null, user_id);
});
module.exports = new DashboardController;