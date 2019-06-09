const nodeMailer = require('nodemailer');
import { Config } from '../../config';


export class MailController{

    sendMail(user, comment): void{
        const transporter = nodeMailer.createTransport({
          service: 'Gmail',
          auth: {
            user: Config.EMAILDATA.EMAIL,
            pass: Config.EMAILDATA.PASSWORD
          }
        });
      
        const mailOptions = {
          from: `"Egor" <${Config.EMAILDATA.EMAIL}>`,
          to: user.email,
          subject: 'Message',
          text: `You have been mentioned in this comment: ${comment.text}`
        };
    
        transporter.sendMail(mailOptions);
    }
}