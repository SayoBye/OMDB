const render = require('../lib/render');

const notFound = (req, res) => {
    render(res, 'error.html', {
        Error: 'Страница не найдена!'
    });
}

module.exports = notFound;