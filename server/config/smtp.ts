import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class SMTPClient {
  private transporter: Transporter;
  private email: string;
  private OTP?: string;
  private mailOptions?: SendMailOptions;

  constructor(email: string) {
    this.transporter = nodemailer.createTransport({
      host: process.env._SMTP_HOST,
      port: parseInt(process.env._SMTP_PORT as string, 10),
      secure: false,
      auth: {
        user: process.env._SMTP_HOST_USER,
        pass: process.env._SMTP_HOST_PASSWORD,
      },
    });
    this.email = email;
  }

  generateOTP(): string {
    this.OTP = Math.floor(100000 + Math.random() * 900000).toString();
    return this.OTP;
  }

  generateMail(): void {
    if (!this.OTP) {
      throw new Error("OTP not generated");
    }
    this.mailOptions = {
      from: process.env._SMTP_SENDER_EMAIL,
      to: this.email,
      subject: "Your OTP for verification",
      text: `Your OTP is ${this.OTP}`,
    };
  }

  sendVerificationMail(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.mailOptions) {
        return reject(new Error("Mail options not set"));
      }
      this.transporter.sendMail(this.mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          reject(new Error('SMTP Client Error'));
        } else {
          resolve(info);
        }
      });
    });
  }
}

export default SMTPClient;
