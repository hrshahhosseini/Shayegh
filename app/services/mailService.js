exports.mail = (req, option) => {
    const nodemailer = require(`nodemailer`)
    const transport = nodemailer.createTransport({
        service: `gmail`,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD
        }
    })

    const mailOption = {
        from: `Shahhosseini.5040@gmail.com`,
        to: req.body.email,
        subject: `DD || The mail contains 'Daneshjoo Dong' password reset link .`,
        text: `how r u doing`,
        html: `<h2> برای اعمال رمز جدید برای حساب کاربری خود در سایت دانشجو دنگ ، روی لینک زیر کلیک کنید </h2>
        <p> ${process.env.domain}/auth/login/reset-password/${option} : لینک شما </p>
        `
    }

    transport.sendMail(mailOption, (err, data) => {
        if (err) {
            console.log(err)
        }
    })
}