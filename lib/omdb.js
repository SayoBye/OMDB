const http = require('http');

const get = (title, done) => {
    const req = http.get(`http://www.omdbapi.com/?i=tt3896198&apikey=7287e43&t=${title}`, res => {
        if (res.statusCode !== 200) {
            done(new Error(`${res.statusCode}: ${res.statusMessage}`));
            res.resume();
            return;
        }

        res.setEncoding('utf-8');
        let body = '';
        res.on('data', data => body += data);
        res.on('end', () => {
            let result;

            try {
                result = JSON.parse(body);
            } catch (error) {
                return done(error.message);
            }

            if (result.Response === 'False') {
                return done(new Error('Фильм не найден'));
            }

            return done(null, result);
        })
    })

    req.on('error', err => {
        done(err);
    })
}

module.exports = {
    get
};