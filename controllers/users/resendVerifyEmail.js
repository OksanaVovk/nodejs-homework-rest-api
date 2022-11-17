const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const { BadRequest, NotFound } = require("http-errors");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound("User not found");
  }
  if (user.verify) {
    throw BadRequest("Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Підтвердження реєстрації на сайті",
    html: `<a href= "http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Нажміть для підтвердження email</a>`,
  };
  await sendEmail(mail);
  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
