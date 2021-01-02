const express = require(`express`)
const Router = express.Router()
const authenticated = require(`../../middleware/authentication`)
const isNotAuthenticated = authenticated.notAuthenticate

const login = require(`./login/index`)
const registerController = require(`../../controllers/user/authControllers`)
const validatorPartials = require(`../../validator/registerValidator`)
const registerValidator = require(`../../validator/registerValidatorMiddleware`)
// Router.get(`/sample`, [middleware] , myFunction)
Router.use(`/login`, login)
Router.delete(`/logout`, (req, res) => {
    req.logout()
    res.redirect(`/auth/login`)
})
Router.get(`/register`, [isNotAuthenticated()], (req, res) => {
    res.send({ message: `here is register route` })
})
Router.post(`/register`, registerValidator(validatorPartials), registerController.register)

module.exports = Router