const fs = require('fs');
const path = require('path');


var readStream = fs.createReadStream(
    path.join(__dirname, 'text.txt'),
    'utf-8',
)

readStream.on('data', function(chunk) {
    console.log(chunk);
})