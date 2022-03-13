const User = require('../models/UserModel');

const index = (req, res) => res.render('user');

const create = async (req, res) => {
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
    req.session.save(() => {
        return res.redirect('/user/index');
    });
    return;
};

module.exports = { index, create };
