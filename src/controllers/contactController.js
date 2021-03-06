const Contact = require('../models/ContactModel');

const index = (req, res) => res.render('contact', { contact: {} });

const register = async (req, res) => {
    try {
        req.body.createdBy = req.session.user._id;
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

const editIndex = async (req, res) => {
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

const edit = async (req, res) => {
    if (typeof req.params.id !== 'string') return res.render('error404');
    try {
        req.body.createdBy = req.session.user._id;
        const contact = new Contact(req.body);
        await contact.edit(req.params.id);

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => {
               return res.redirect('/contacts/index')
            });
            return;
        }

        req.flash('success', 'Contato editado com sucesso.');
        req.session.save(() => res.redirect(`/contacts/index/${contact.contact._id}`));
        return;
    } catch (err) {
        console.log(err);
        res.render('error404');
    }
};

const exclude = async (req, res) => {
    if (!req.params.id) return res.render('error404');
    try {
        const contact = await Contact.exclude(req.params.id);
        req.flash('success', `Contato "${contact.name}" deletado com sucesso.`);
        req.session.save(() => res.redirect(`/index`));
        return;
    } catch (err) {
        console.log(err);
        res.render('error404');
    }
};

module.exports = { index, register, editIndex, edit, exclude };
