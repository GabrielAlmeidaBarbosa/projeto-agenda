const globalMiddleware = (req, res, next) => {
    console.log();
    console.log('Passei no middlware global');
    console.log();
    next();
};

const checkCsrfError = (err, req, res, next) => {
    if (err && 'EBADCSRFTOKEN' === err.code)
        return res.render('error404');
};

const csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

module.exports = { globalMiddleware, checkCsrfError, csrfMiddleware };
