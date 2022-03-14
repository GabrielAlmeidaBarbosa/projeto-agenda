const User = require('../models/UserModel');

const index = (req, res) => {
    if (req.session.user) return res.render('user-area');
    res.render('user');
};

const create = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.create();

        if (user.errors.length > 0){
            req.flash('errors', user.errors);
            req.session.save(() => {
                return res.redirect('/user/index');
            });
            return;
        }

        req.flash('success', 'Usuário criado com sucesso.');
        req.session.user = user.user;
        req.session.save(() => {
            return res.redirect('/user/index');
        });
    } catch (err) {
        console.log(err);
        res.render('error404');
    }
};

const login = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.login();

        if (user.errors.length > 0) {
            req.flash('errors', user.errors);
            req.session.save(() => {
                return res.redirect('/user/index');
            });
            return;
        }

        req.flash('success', 'Login efetuado com sucesso.');
        req.session.user = user.user;
        req.session.save(() => {
            return res.redirect('/user/index');
        });
    } catch (err) {
        console.log(err);
        res.render('error404');
    }
};

const logout = (req, res) => req.session.destroy(() => res.redirect('/index'));

module.exports = { index, create, login, logout };
