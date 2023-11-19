const {createMailTransporter} = require('./createMailTransporter');
const sendVerificationEmail = async (email, token) => {
    const transporter = createMailTransporter();
    const mailOptions = {
        from: 'nt303662@gmail.com',
        to: email,
        subject: 'Verify your email...',
        html: `<p> Hello ${email}, </p> verify your email with this token: ${token}`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
module.exports = {sendVerificationEmail};