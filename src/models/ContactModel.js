const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: String, required: true }
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async register() {
        this.validate();
        if (this.errors.length > 0) return;

        try {
            this.contact = await ContactModel.create(this.body);
        } catch (err) {
            console.log(err);
        }
    }

    async edit(id) {
        this.validate();
        if (this.errors.length > 0) return;

        try {
            this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { 
                new: true 
            });
        } catch (err) {
            console.log(err);
        }
    }

    validate() {
        this.cleanUp();

        if (this.body.name.length === 0) 
            this.errors.push('É obrigatório que o campo Nome seja preenchido.');
        
        if (this.body.email.length === 0 && this.body.phone.length === 0)
            this.errors.push('Um contato deve possuir pelo menos um Email ou um Telefone.');
        
        if (this.body.email.length > 0 && !validator.isEmail(this.body.email))
            this.errors.push('Email inválido.');
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            name: this.body.name,
            lastName: this.body.lastName,
            email: this.body.email,
            phone: this.body.phone,
            createdBy: this.body.createdBy
        };
    }

    static async list(userId) {
        const contacts = await ContactModel.find({ createdBy: userId })
            .sort({ createdAt: -1 });
        return contacts;
    }

    static async exclude(id) {
        if (typeof id !== 'string') return;
        const contact = await ContactModel.findByIdAndDelete(id);
        return contact;
    }

    static async findById(id) {
        if (typeof id !== 'string') return;
        const user = await ContactModel.findById(id);
        return user;
    }
};

module.exports = Contact;
