const Contact = require('../models/ContactModel');

const index = async (req, res) => {
    try {
        const contacts = await Contact.list();
        res.render('index', { contacts: contacts || [{}] });
        return;
    } catch (err) {
        console.log(err);
        res.render('error404');
    }
};

module.exports = { index };
