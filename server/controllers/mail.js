const nodemailer = require('nodemailer')
const Mailgen = require('mailgen');

let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    var email = {
        body: {
            name: username,
            intro: text || "Welcome to onBoarding Process",
            outro: "Any questions?"
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successfully",
        html: emailBody
    }

    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You will received an email from us" });
        })
        .catch(err => res.status(500).send({ err }))
}


module.exports = { registerMail }