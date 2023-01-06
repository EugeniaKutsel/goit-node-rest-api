const bcrypt = require("bcryptjs");
const { User } = require('../../models/user');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({
      message: "Email in use"
    })
  }

  const hashPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({ ...req.body, password: hashPassword });
  
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription
    }
  })
}

module.exports = register;