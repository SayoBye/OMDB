const fs = require('fs');
const path = require('path');

const render = require('../lib/render');

const home = (req, res) => {
    render(res, 'index.html');
}

module.exports = home;