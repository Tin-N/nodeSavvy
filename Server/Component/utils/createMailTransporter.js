const nodemailer = require('nodemailer');

const createMailTransporter = () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "thuanntps24818@fpt.edu.vn",
            pass: "axbp klab ebht brsp",
        },
    });
    return transporter;
};
module.exports = {createMailTransporter};