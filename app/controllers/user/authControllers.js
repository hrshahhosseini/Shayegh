const model = require(`../../model/user/authModel`)
const emailService = require(`../../services/mailService`)
const jwt = require(`jsonwebtoken`)
const passport = require(`passport`)

class authController {
    constructor() { }
    // ---- login ----
    async login(req, res) {
        const user = await model.findUser1(req)
        if (user.length > 0) {
            if (req.body.password !== user[0].password) {
                return res.json({ success: false, message: `user pass doesn't match` })
            }
            req.login(user[0].id, (err) => {
                return res.status(200).json({ success: true, message: `successfully logged in` })
            })
        }
        return res.status(400).json({ success: false, message: `user doesn't exists` })
    }
    async loginGoWhere(req, res) {
        const user = await model.findUser(req)
        if (user.length > 0) {
            req.login(user[0].id, (err) => {
                // if (req.params.where = undefined) return res.redirect(`/dashboard`)
                console.log(req.params.where, req.params.to)
                return res.redirect(`/${req.params.where}/${req.params.to}/${req.params.go}/${req.params.token}`)
            })
        }
        return res.status(400).json({ success: false, message: `user doesn't exists` }) //  ...
    }


    async register(req, res) {
        const user = await model.findUser(req)
        if (user.length == 0) {
            const registeredUser = await model.insertUser(req)
            req.login(registeredUser[0].id, (err) => {
                return res.status(200).json({ accessCode: 1000, message: `success` }) // dashboard
            })
            // return registeredUser ? res.status(200).json(JSON.stringify(registeredUser)) : res.status(400)
        }
        return res.status(400).json({ accessCode: 1004, message: `user exists ` }) // ...
    }

    async forgetPassword(req, res) {
        const user = await model.findUserByEmail(req)
        if (user.length == 0)
            return res.status(400).json({ error: 1005 }) // no user found with this email-address
        const token = jwt.sign({ email: req.body.email }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '20m' })
        // jwt.verify(token, process.env.RESET_PASSWORD_SECRET, (err, encodedData) => {
        //     console.log(encodedData)
        // })
        const result = await model.updateUserResetLinkForReset(req, token)
        emailService.mail(req, token)
        return res.redirect(`/auth/login/reset-password/:token`)
    }

    async resetPassword(req, res) {
        const resetLink = req.params.token

        if (!resetLink)
            return res.status(400).json({ err: 1006, message: `err in reset link` }) //  ...
        const encodedData = jwt.verify(resetLink, (process.env.RESET_PASSWORD_SECRET))
        const user = await model.findOneForReset([], `users`, encodedData.email)

        if (user[0].resetLink !== resetLink)
            return res.status(400).json({ err: 1007, message: `incorrect token` }) //  ...
        const updated = await model.updateUserResetLinkForReset(req, ``)

        const result = await model.updateUserPasswordForReset(req, encodedData.email)
        return res.status(200).json({ accessCode: 1000, message: `success` })
    }
}


passport.serializeUser((user_id, done) => {
    done(null, user_id);
});
passport.deserializeUser((user_id, done) => {
    done(null, user_id);
});
module.exports = new authController