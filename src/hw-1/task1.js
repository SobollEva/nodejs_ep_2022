const ReversStream = require('./classes');
const constants = require('./constants');

process.stdin.setEncoding(constants.ENCODING_UTF8);
process.stdout.setEncoding(constants.ENCODING_UTF8);

process.stdin
    .pipe(new ReversStream)
    .on('error', error => console.log(constants.ERROR_MESSAGE, error.message))
    .pipe(process.stdout)
