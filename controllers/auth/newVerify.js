const { User } = require('../../models/user');
const { sendEmail } = require('../../middlewares');
const { BASE_URL } = process.env;

const newVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({
      message: "User not found"
    })
  }

  if (user.verify) {
    res.status(400).json({
      message: "Verification has already been passed",
    });
    return;
  }

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
}

module.exports = newVerify;