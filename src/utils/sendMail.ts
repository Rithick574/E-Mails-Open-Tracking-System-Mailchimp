import { createTransport } from "nodemailer";

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: Bun.env.MAIL_USER,
    pass: Bun.env.SMTP_PASSWORD,
  },
});

export const sendMail = async(emails:string[],trackingId:string)=>{
  const trackingURL = `${Bun.env.BASE_URL}/track/track-mail/${trackingId}`;
    const mailOptions={
        from:Bun.env.MAIL_USER,
        to:emails.join(','),
        subject:'Tracked Email',
        html:`
        <div>
        <h1> Your Tracking ID: ${trackingId} </h1>
        <p>This email is being tracked for demonstration purposes.</p>
        <img src="${trackingURL}" alt="dead pixel" style="width:1px;height:1px;display:none;" />
        </div>
        `,
    };

    try {
      const info = await transport.sendMail(mailOptions);
      console.log('Emails sent successfully:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending emails:', error);
      throw error; 
    }
}