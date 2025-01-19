import nodemailer from 'nodemailer';
export const sendWeatherEmail = async (content: string, p0: unknown) => {
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
      auth: {
        user: 'sayalipr15@gmail.com',
        pass: 'lirt czbx uvla clwp'
      }
    });
    const mailOptions = {
      from: 'sayalipr15@gmail.com',
      to: 'rahanesayali8@gmail.com',
      subject: 'Weather Data',
      html: content
    };

await transporter.sendMail(mailOptions);
};