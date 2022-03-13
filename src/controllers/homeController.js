const homePage = (req, res) => res.render('index', {
    title: 'This is my title'
});

const dataProcessing = (req, res) => res.send(req.body);

module.exports = { homePage, dataProcessing };
