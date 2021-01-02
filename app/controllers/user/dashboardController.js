const model = require(`../../model/user/dashboardModel`)
const mailService = require(`../../services/mailService-chargeRequest`)
const passport = require(`passport`)
const jwt = require(`jsonwebtoken`)
class DashboardController {
    constructor() { }

    async createGroup(req, res) {
        const result = await model.newGroup(req, `team`, ``, ``)
        return result == 1 ? res.send({ message: `you already have a group ...` }) : res.send({ message: `${result.affectedRows} group created ...` })
    }

    async addToGroup(req, res) {
        const result = await model.addUser(req, `users`, [], `email`)
        return result == 1 ? res.send({ message: `olla` }) : result == 2 ? res.send({ message: `you can't add user to the group ...` }) : res.send({ message: `user is another group's participant ...` })
    }

    async remove(req, res) {
        const result = await model.removeUser(req, `users`, [], `email`)
        return result == 2 ? res.send({ message: `you can't remove user from the group ...` }) : result == 3 ? res.send({ message: `user is not in your group` }) : res.send({ message: `user removed ...` })
    }

    async removeGroup(req, res) {
        const result = await model.removeGroup(req, `users`, [], ``)
        return result == 2 ? res.send({ message: `you can't remove the group ...` }) : result == 3 ? res.send({ message: `sth went wrong , group name doesn't exists in team table` }) : res.send({ message: `group removed completely` })


    }

    async wallet(req, res) {
        const result = await model.chargeWallet(req)
        return result > 0 ? res.redirect(`/dashboard`) : res.redirect(`/dashboard/wallet/wallet-charge`)
    }

    async requestCharge(req, res) {
        const [email] = await db.query(`select email from users where id = ? limit 1`, [req.user.id])
        const token = jwt.sign({ email: email[0].email, amount: req.body.amount }, process.env.CHARGE_REQUEST_SECRET, { expiresIn: `10m` })
        mailService.mail(req, token)
        return res.redirect(`/dashboard`)
    }

    async requestChargeShow(req, res) {
        const token = req.params.token
        const encodedData = jwt.verify(token, (process.env.CHARGE_REQUEST_SECRET))
        return res.send(encodedData)
    }

    async requestChargeDo(req, res) {
        const token = req.params.token
        const encodedData = jwt.verify(token, (process.env.CHARGE_REQUEST_SECRET))
        if (req.body.confirm == true) {
            const result = await model.transition(req, encodedData)
            if (result == 1.1) return res.send({ message: `موجودی حساب شما کافی نیست` })
            return res.redirect(`/dashboard`)
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