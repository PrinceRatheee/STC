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
          service: "Gmail",
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
          });

          const mailOptions={
            from : process.env.EMAIL_USER,
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