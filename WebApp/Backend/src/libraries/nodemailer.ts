import nodemailer from "nodemailer";
const sendingEmail = "howto0158@gmail.com";

let transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: sendingEmail,
    pass: "cbemivbxohsusiia",
  },
});
export const sendOTP = async (email: string, subject: string, text: number) => {
  const message = {
    to: email,
    from: `Smart Devices System ${sendingEmail}`,
    subject: subject,
    text: "Your OTP Verification code is " + text.toString(),
  };
  await transporter.sendMail(message);
};
