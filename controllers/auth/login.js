const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');

const {SECRET_KEY} = process.env

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({
      message: "Email or password is wrong"
    })
  }

  if (!user.verify) {
    res.status(401).json({
      message: "Please verify your email"
    })
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    res.status(401).json({
      message: "Email or password is wrong"
    })
  }

  const payload = {
    id: user._id
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription
    }
  })
}

module.exports = login;