var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anuragibt@gmail.com",
    pass: "hnphevgisfycvwgc",
  },
});
var mailOptions = {
  from: "anuragibt@gmail.com",
  to: "anuragabcr@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
