const bcrypt = require("bcryptjs");
const { User } = require('../../models/user');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../../middlewares');
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({
      message: "Email in use"
    })
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const verificationToken = uuidv4();
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarUrl, verificationToken });
  
  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}>Click to verify your email</a>`
  }

  await sendEmail(verifyEmail);
  
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription
    }
  })
}

module.exports = register;