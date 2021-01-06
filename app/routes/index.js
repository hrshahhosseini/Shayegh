const mainUser = require(`./user/index`)
const cors = require('cors');
module.exports = (app) => {
    app.use((req, res, next) => {   // favicon.ico problem
        if (req.url === '/favicon.ico') {
            res.writeHead(200, { 'Content-Type': 'image/x-icon' });
            return res.end();
        }
        next()
    })
    app.use(cors());
    app.use(`/`, mainUser)


    app.use((req, res, next) => {
        return res.redirect(`/notFound`)
        next()
    })
}