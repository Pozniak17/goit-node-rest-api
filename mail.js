import sgMail from "@sendgrid/mail";

const transport = sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendMail(message) {
  return transport.sgMail.send(message);
}

export default { sendMail };
