import { getTemplate } from "./htmlTemplateStrings";
import nodemailer from 'nodemailer'
import { SubjectEnum, User } from "./kafkaTypes";
require('dotenv').config();

export async function sendMail(user: User, subject: SubjectEnum, token?: string) {
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 2525,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
  const result = await transport.sendMail({
    from: "no-reply@lubycash.com", 
    to: user.email, 
    subject: subject, 
    html: getTemplate(subject, user, token)
  })
  console.log('message sent',result.messageId)
  return 'Message sent'
}