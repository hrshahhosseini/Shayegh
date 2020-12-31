const express = require(`express`)
const app = express()
require(`./bootstrap`).bootConfig(app)
require(`./middleware`)
require(`./routes`)(app)



module.exports = () => {
    const port = process.env.APP_PORT
    app.listen(port, () => {
        console.log(`app is running on port ${port}`)
    })
}