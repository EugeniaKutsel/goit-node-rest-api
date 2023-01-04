const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = new Schema({
  name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
}, { versionKey: false, timestamps: true })

contactSchema.post("save", (error, data, next) => {
  console.log(error.code);
  console.log(error.name);
  next()
})

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().regex(/^[0-9]{10}$/).required(),
  favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  addSchema,
  updateFavoriteSchema
} 

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas
}