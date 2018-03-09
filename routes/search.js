const url = require('url');

const omdb = require('../lib/omdb');
const render = require('../lib/render');

const search = (req, res) => {
    const { query } = url.parse(req.url, true);

    if (query.title) {
        omdb.get(query.title, (err, film) => {
            if (err) {
                render(res, 'error.html', {
                    Error: err.message
                });
            };

            render(res, 'movie.html', film);
        });
    } else {
        render(res, 'error.html', {Error: 'Страница не найдена!'})
    }

}

module.exports = search;