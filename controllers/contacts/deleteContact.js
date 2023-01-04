const { Contact } = require('../../models/contact');

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  if (!deletedContact) {
    res.status(404).json({
      message: "Not found"
    })
    return;
  }
  res.json({
    message: "contact deleted"
  })
}

module.exports = deleteContact;