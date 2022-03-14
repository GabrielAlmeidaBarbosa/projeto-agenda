const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    createdAt: { type: Date, default: Date.now() }
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
            phone: this.body.phone
        };
    }

    static async findById(id) {
        if (typeof id !== 'string') return;
        const user = await ContactModel.findById(id);
        return user;
    }
};

module.exports = Contact;
