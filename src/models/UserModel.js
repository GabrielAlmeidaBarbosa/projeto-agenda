const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const UserModel = mongoose.model('User', UserSchema);

class User {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async create() {
        this.validate();
        if (this.errors.length > 0) return;
        
        await this.userExists();
        if (this.errors.length > 0) return;

        const salt = bcrypt.genSaltSync();
        this.body.password = bcrypt.hashSync(this.body.password, salt);
        this.user = await UserModel.create(this.body);
        return;
    }

    async login() {
        this.validate();
        if (this.errors.length > 0) return;

        this.user = await UserModel.findOne({ email: this.body.email });
        if (!this.user) {
            this.errors.push('Email inválido.');
            return;
        }

        if (!bcrypt.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida.');
            this.user = null;
            return;
        }
    }

    validate() {
        this.cleanUp();

        if (!validator.isEmail(this.body.email)) {
            this.errors.push('Email inválido.');
        }
        
        if (this.body.password.length < 4 || this.body.password.length > 20) {
            this.errors.push('A senha deve conter entre 4 e 20 caracteres.');
        }
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }

    async userExists() {
        try {
            const user = await UserModel.findOne({ email: this.body.email });
            if (user) {
                this.errors.push('O email digitado já está cadastrado.');
            }
            return;
        } catch (err) {
            console.log(err);
        }
    }
};

module.exports = User;
