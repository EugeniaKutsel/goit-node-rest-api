const { Contact } = require('../../models/contact');

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const updateStatusContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  res.json(updateStatusContact);
  
}

module.exports = updateFavorite;