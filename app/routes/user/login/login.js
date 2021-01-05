const express = require(`express`)
const router = express.Router()
const loginValidator = require(`../../../validator/loginValidatorMiddleware`)
const validatorPartials = require(`../../../validator/loginValidator`)
const notLoggedIn = require(`../../../middleware/authentication`).notAuthenticate
const loggedIn = require(`../../../middleware/authentication`).authenticate

const controller = require(`../../../controllers/user/authControllers`)

router.post(`/`, [loginValidator(validatorPartials), notLoggedIn()], controller.login) // login
router.get(`/`, notLoggedIn(), (req, res) => {
    res.send({ message: `ur here to login ...` })
})
router.get(`/:where/:to/:go`, [loggedIn()], (req, res) => {
    res.send({ message: `you are here to login ... , ${req.params.where}` })
})
router.post(`/:where/:to/:go/:token`, [loginValidator(validatorPartials), loggedIn()], controller.loginGoWhere)


router.get(`/forget-password`, (req, res) => {
    res.send({ message: `ur here to enter ur email ...` })
})
router.post(`/forget-password`, controller.forgetPassword) // enter email  |  request midim baray in safhe

router.get(`/reset-password/:token`, (req, res) => {
    res.send({ message: `ur here to enter new password ...` })
})
router.post(`/reset-password/:token`, controller.resetPassword) // enter new password


module.exports = router