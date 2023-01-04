const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
    const allContacts = await Contact.find();
    res.json(allContacts);
}

module.exports = getAll;