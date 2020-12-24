const model = require(`../../model/user/authModel`)
const emailService = require(`../../services/mailService`)
const jwt = require(`jsonwebtoken`)
const passport = require(`passport`)

class authController {
    constructor() { }
    async login(req, res) {
        const user = await model.findUser(req)
        if (user.length > 0) {
            req.login(user[0], (err) => {
                //req.session.user = req.user;
                return res.redirect(`/dashboard`)
            })
        }
        return res.status(400).send({ message: `user doesn't exists ...` })
    }

    async register(req, res) {
        const user = await model.findUser(req)
        if (user.length == 0) {            
            const registeredUser = await model.insertUser(req)
            req.login(registeredUser[0], (err) => {
                return res.redirect(`/dashboard`)
            })
            // return registeredUser ? res.status(200).send(JSON.stringify(registeredUser)) : res.status(400)
        }
        return res.status(400).send({ message: `user exists ...` })
    }

    async forgetPassword(req, res) {
        const user = await model.findUserByEmail(req)
        if (user.length == 0)
            return res.status(400).json({ error: `no user found with this email-address` })
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
            return res.status(400).send({ err: `err in reset link ...` })
        const encodedData = jwt.verify(resetLink, (process.env.RESET_PASSWORD_SECRET))
        const user = await model.findOneForReset([], `users`, encodedData.email)

        if (user[0].resetLink !== resetLink)
            return res.status(400).send({ err: `incorrect token ...` })
        const updated = await model.updateUserResetLinkForReset(req, ``)

        const result = await model.updateUserPasswordForReset(req, encodedData.email)
        return res.status(200).redirect(`/auth/login`)
    }
}


passport.serializeUser((user_id, done) => {
    done(null, user_id);
});
passport.deserializeUser((user_id, done) => {
    done(null, user_id);
});
module.exports = new authController