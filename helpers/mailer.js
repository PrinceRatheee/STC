import nodemailer from "nodemailer";
import User from "../models/user";
import bcryptjs from 'bcryptjs';

export const sendEmail=async({email,emailType,userId})=>{
    try {
        
        //creating a hashed token
        console.log("token")
        console.log(userId)
        const hashedToken=await bcryptjs.hash(userId.toString(),10)   
        console.log(hashedToken)
        if( emailType ==="VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000})
        }else if(emailType ==="RESET"){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "3fbdda0b77a2de",
              pass: "a076e788beb6b6"
            }
          });

          const mailOptions={
            from : 'prince@gmail.com',
            to:email,
            subject:emailType==="VERIFY"?"Verify your email":"Reset your password",
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY"?"verify your email": "reset your password" }</p>`
          }
          const mailresponse=await transport.sendMail(mailOptions);
          return mailresponse;
    } catch (error) {
        throw new Error(error.message);
    }
}