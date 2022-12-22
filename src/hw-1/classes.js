const stream = require('stream');
const constants = require('./constants');

class ReversStream extends stream.Transform {
    constructor() {
        super();
    }

    _transform(chunk, encoding, callback) {
        callback(null, chunk.toString(constants.ENCODING_UTF8).split('').reverse(). join(''));
    }
}

module.exports = ReversStream;
