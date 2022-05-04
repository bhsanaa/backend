const nodemailer = require("nodemailer");
const log = console.log;

// Step 1
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sana.benhammouda007@gmail.com", // TODO: your gmail account
        pass: "SanaYassine", // TODO: your gmail password
    },
});

const sendEmail = async(email, subject, resetLink) => {
    // Step 2
    log("mail is", email);
    let mailOptions = {
        from: "sana.benhammouda007@gmail.com", // TODO: email sender
        to: email, // TODO: email receiver
        subject: subject,
        text: "Wooohooo it works!!",
        html: ` <p>Hi ,</p></br>
    <p>You request to password reset</p></br>
    <a href=${resetLink}>Click this link to reset your password</a>
    `,
    };
    // Step 3
    const res = await transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return false;
        }
        return true;
    });
    return res;
};

module.exports = {
    sendEmail,
};