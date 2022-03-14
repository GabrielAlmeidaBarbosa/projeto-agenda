const Contact = require('../models/ContactModel');

const index = (req, res) => res.render('contact', { contact: {} });

const register = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => {
               return res.redirect('/contacts/index')
            });
            return;
        }

        req.flash('success', 'Contato salvo com sucesso.');
        req.session.save(() => res.redirect(`/contacts/index/${contact.contact._id}`));
        return;
    } catch (err) {
        console.log(err);
        res.render('error404');
    }
};

const update = async (req, res) => {
    if (!req.params.id) return res.render('error404');
    try {
        const contact = await Contact.findById(req.params.id);
        res.render('contact', { contact });
        return
    } catch (err) {
        console.log(err);
        res.render('error404');
    }
    
};

module.exports = { index, register, update };
