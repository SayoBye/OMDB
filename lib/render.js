const fs = require('fs');
const path = require('path');

const render = (res,templateName, data) => {
    fs.readFile(path.join(__dirname, '..', 'templates', templateName), 'utf-8', (err, template) => {
        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            return res.end(err.message);
        } else if (!data) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            return res.end(template);
        }

        const html = template.replace(/{{([^{}]*)}}/g, (placeholder, property) => {
            const match = data[property];
            return match || placeholder;
        });

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        return res.end(html);
    })
}

module.exports = render;