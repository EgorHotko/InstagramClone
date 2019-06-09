const nodeMailer = require('nodemailer');


export class MailController{

    sendMail(user, comment): void{
        const transporter = nodeMailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'ehotkofinaltask@gmail.com',
            pass: 'finaltask'
          }
        });
      
        const mailOptions = {
          from: '"Egor" <ehotkofinaltask@gmail.com>',
          to: user.email,
          subject: 'Message',
          text: `You have been mentioned in this comment: ${comment.text}`
        };
    
        transporter.sendMail(mailOptions);
    }
}