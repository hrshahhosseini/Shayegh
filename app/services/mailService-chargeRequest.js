const nodemailer = require(`nodemailer`)
exports.mail = (req, option) => {
    const transport = nodemailer.createTransport({
        service: `gmail`,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD
        }
    })

    const name = req.body.email.split(`@`, 1)
    const mailOption = {
        from: `Shahhosseini.5040@gmail.com`,
        to: req.body.email,
        subject: `DD || This Email contains a 'Daneshjoo Dong' web application request - forwarded from ${req.user.email} .`,
        text: `Hi bear ${name}`,
        html: `<h2> <pre> 
        برای پاسخ به این درخواست انتقال شارژ ، روی لینک زیر کلیک کنید
        در غیر این صورت می توانید از این ایمیل چشم پوشی کنید </pre></h2>
        <p> ${process.env.domain}/dashboard/wallet/request-confirm/${option} : لینک شما </p>
        `
    }

    transport.sendMail(mailOption, (err, data) => {
        if (err) {
            console.log(err)
        }
    })



}
