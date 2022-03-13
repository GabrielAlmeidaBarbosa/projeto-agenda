const globalMiddleware = (req, res, next) => {
    console.log('-> Passei no middlware global');
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

module.exports = { globalMiddleware, checkCsrfError, csrfMiddleware };
