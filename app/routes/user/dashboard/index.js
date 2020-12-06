const express = require(`express`)
const Router = express.Router()

Router.get(`/newGroup`, (req, res) => {
    res.send({ message: `hi guys ...` })
})


module.exports = Router