import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
    }
});

export default (mailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            } else {
                resolve(info.messageId)
            }
        });

    })
}
