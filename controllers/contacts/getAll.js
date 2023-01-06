const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    const allContacts = await Contact.find({
        $and: [
            { owner },
            { favorite: favorite === undefined ? { $in: [true, false] } : favorite }]
    }, "", { skip, limit }).populate("owner", "email");
    
    res.json(allContacts);
}

module.exports = getAll;