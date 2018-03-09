const http = require('http');

const { general, home, search, notFound} = require('../routes');


http.createServer((req, res) => {
    if (req.url.match(/\.(html|css|js|png)$/)) {
        general(req, res);
    } else if (req.url === '/' || req.url === '/index.html') {
        home(req, res);
    } else if (req.url.startsWith('/search')) {
        search(req, res);
    } else {
        notFound(req, res);
    }
}).listen(9000, () => console.log('running'));