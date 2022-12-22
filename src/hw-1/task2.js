const csv =require('csvtojson');
const fs = require('fs');
const constants = require('./constants');

const csvPath = 'src/hw-1/file.csv';
const txtPath = 'src/hw-1/file.txt';

const handleError = error => console.log(constants.ERROR_MESSAGE, error.message);
const handleSuccess = () => console.log(constants.SUCCESS_MESSAGE);

const readStream = fs.createReadStream(csvPath);
const writeStream = fs.createWriteStream(txtPath);

readStream
    .on('error', error => handleError(error))
    .pipe(csv())
    .on('error', error => handleError(error))
    .on('end', handleSuccess)
    .pipe(writeStream)


