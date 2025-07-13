let nodeMailer = require("nodemailer");

exports.sendEmail = async (options) => {
  let transporter = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c63ee759f77e0a",
      pass: "4f68a478250163",
    },
  });
  let mailOptions = {
    from: "s6y2o@example.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  await transporter.sendMail(mailOptions);
};
