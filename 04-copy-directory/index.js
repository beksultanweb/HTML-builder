const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created successfully!');
});



fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, files) => {
    if (err)
    console.log(err);
  else {
    files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name),  (err, el) => {
            if (err) throw err;
            console.log(file.name, 'is copied');
        })
    })
  }
});