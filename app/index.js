const express = require(`express`)
const app = express()
require(`./bootstrap`).bootConfig(app)
require(`./middleware`)
require(`./routes`)(app)



module.exports = () => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`app is running on port ${port}`)
    })
}