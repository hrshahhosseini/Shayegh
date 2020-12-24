const express = require(`express`)
const router = express.Router()
const loginValidator = require(`../../../validator/loginValidatorMiddleware`)
const validatorPartials = require(`../../../validator/loginValidator`)
const authenticated = require(`../../../middleware/authentication`).notAuthenticate

const controller = require(`../../../controllers/user/authControllers`)

router.post(`/:whereToGo1/:whereToGo2`, [loginValidator(validatorPartials), authenticated()], controller.login) // login
router.get(`/:whereToGo1/:whereToGo2`, authenticated(), (req, res) => {
    res.send({ message: `ur here to login ...` })
})


router.get(`/forget-password`, (req, res) => {
    res.send({ message: `ur here to enter ur email ...` })
})
router.post(`/forget-password`, controller.forgetPassword) // enter email  |  request midim baray in safhe

router.get(`/reset-password/:token`, (req, res) => {
    res.send({ message: `ur here to enter new password ...` })
})
router.post(`/reset-password/:token`, controller.resetPassword) // enter new password


module.exports = router