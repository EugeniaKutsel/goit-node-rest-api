const { Contact } = require('../../models/contact');

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    res.status(404).json({
      message: "Not found"
    })
    return;
  }
  res.json(contact);
}

module.exports = getById;