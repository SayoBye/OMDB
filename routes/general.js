const fs = require('fs');
const path = require('path');


const render = require('../lib/render');

const general = (req, res) => {
    const ext = path.extname(req.url);
    let contentType = '';
    if (req.url === '/index.html') return render(res, 'index.html');

    switch (ext) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.html':
            contentType = 'text/html';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
    }

    res.setHeader('Content-Type', contentType);
    res.statusCode = 200;


    const stream = fs.createReadStream(path.join(__dirname, '..', 'public', req.url));
    stream.on('error', error => {
        if (error.code === 'ENOENT') {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            return res.end('Not Found')
        } else {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            return res.end(error.message);
        }

    })
    stream.pipe(res);

}

module.exports = general;