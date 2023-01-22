const validation = require('./validation');
const ctrlWrapper = require('./ctrlWrapper');
const authenticate = require('./authenticate');
const upload = require('./upload');
const sendEmail = require('./sendEmail');

module.exports = {
  validation,
  ctrlWrapper,
  authenticate,
  upload,
  sendEmail
}