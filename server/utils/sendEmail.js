import nodemailer from 'nodemailer'

export const sendEmail = async(to,subject,text)=>{
    try{
        const transporter = nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            port:process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
              },
            secure:false,
        })
        const mailOptions ={
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
        }
        await transporter.sendMail(mailOptions)
        console.log('Email sent successfully');
    }
    catch(error){
        console.error('Error sending email:', error);
        throw error
    }
}