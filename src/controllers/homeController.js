const Contact = require('../models/ContactModel');

const index = async (req, res) => {
    if (!req.session.user) return res.render('index', { contacts: [], logged: false});
    try {
        const contacts = await Contact.list(req.session.user._id);
        res.render('index', { contacts: contacts || [], logged: true });
        return;
    } catch (err) {
        console.log(err);
        res.render('error404');
    }
};

module.exports = { index };
