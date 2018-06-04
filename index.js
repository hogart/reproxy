'use strict';

const request = require('request');
const isRegex = require('is-regex');

/**
 *
 * @param {Object} app express instance
 * @param {Array.<Array>} config array of 2-elements arrays
 */
function reproxy (app, config) {
    if (!Array.isArray(config)) {
        throw new TypeError('Config should be array');
    }

    config.forEach(configLine => {
        const [ listen, redirect ] = configLine;

        app.all(listen, (req, res) => {
            const url = isRegex(listen) ? req.originalUrl.replace(listen, redirect) : redirect + listen;
            const requestOptions = {
                url,
                method: req.method,
                qs: req.query,
                body: req.body
            };

            req.pipe(request(requestOptions)).pipe(res);
        });
    });
}

module.exports = reproxy;
