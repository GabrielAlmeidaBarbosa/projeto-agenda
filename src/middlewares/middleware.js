const globalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

const checkCsrfError = (err, req, res, next) => {
    if (err) {
        return res.render('error404');
    }
    next();
};

const csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

const loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Você precisa fazer login.');
        req.session.save(() => res.redirect('/index'));
        return;
    }
    next();
};

module.exports = { 
    globalMiddleware, 
    checkCsrfError, 
    csrfMiddleware, 
    loginRequired 
};
