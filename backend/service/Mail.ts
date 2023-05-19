
import * as nodemailer from 'nodemailer';

interface IMailObject {
    to: string,
    from: {
        name: string,
        address: string,
    },
    subject: string,
    text?: string,
    html?: string
}

export default class NewMailer {
    transport: any;

    constructor() {
        this.transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

  /**
   * Sends Email
   * @param {reciever, subject, body, type} MessageObject
   * @returns
   */
  async sendMail({ receiver, subject, body, type }) {
    var mailObject: IMailObject = {
        to: receiver,
        from: {
            name: 'Ridwan Bin Monjur',//add name
            address: 'mjrrdn@gmail.com'//add address
        },
        subject
    };

    if (type === 'text') {
        mailObject.text = body;
    }
    else if (type === 'html') {
        mailObject.html = body;
    }

    try {
        let a = await this.transport.sendMail(mailObject);
        console.log(a);
        return true;
    } catch (e) {
        return e;
    }
};
}