const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const subscriptionTypes = ["starter", "pro", "business"];

const userSchema = new Schema({
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    match: emailRegexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscriptionTypes,
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true })

userSchema.post("save", (error, data, next) => {
  console.log(error.code);
  console.log(error.name);
  next()
})

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptionTypes).required(),
})

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema
}

const User = model("user", userSchema);

module.exports = {
  User,
  schemas
}