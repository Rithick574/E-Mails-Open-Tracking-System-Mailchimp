import { createTransport } from "nodemailer";

const transport = createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: Bun.env.MAIL_USER,
    pass: Bun.env.SMTP_PASSWORD,
  },
});

export const sendMail = async(emails:string[],trackingId:string)=>{
    const mailOptions={
        from:Bun.env.MAIL_USER,
        to:emails.join(','),
        subject:'Tracking ID',
        html:`
        <h1> Your Tracking ID: ${trackingId} </h1>
        `,
    }
}