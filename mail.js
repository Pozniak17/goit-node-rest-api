import "dotenv/config";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail(message) {
  try {
    await sgMail.send(message);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export default { sendMail };
