import "dotenv/config";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { EMAIL_FROM, BASE_URL } = process.env;

const sendMail = async (message) => {
  try {
    await sgMail.send(message);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const sendVerifEmail = async (email, verificationToken) => {
  const emailInLowerCase = email.toLowerCase();
  const mailOptions = {
    to: emailInLowerCase,
    from: EMAIL_FROM,
    subject: "Welcome to Contact Book!",
    html: `To confirm your email please follow the <a href="${BASE_URL}/api/users/verify/${verificationToken}">link</a>`,
    text: `To confirm your email please open the link ${BASE_URL}/api/users/verify/${verificationToken}`,
  };
  await sendMail(mailOptions);
};

export default { sendMail, sendVerifEmail };
