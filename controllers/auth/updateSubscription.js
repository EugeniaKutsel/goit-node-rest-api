const { User } = require('../../models/user');

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const updateSubscription = await User.findByIdAndUpdate(_id, req.body, { new: true });
  res.status(200).json({
    message: `Subscription has been changed on ${updateSubscription.subscription}`,
    email: updateSubscription.email,
    subscription: updateSubscription.subscription
  });
}

module.exports = updateSubscription;