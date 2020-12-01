const mainUser = require(`./user/index`)
const express = require('express')

module.exports = (app) => {
    app.use(`/`, mainUser)
}