const { Contact } = require('../../models/contact');

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  res.json(updateContact);
}

module.exports = updateContact;