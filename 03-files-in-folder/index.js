const fs = require('fs');
const path = require('path');



fs.readdir(path.join(__dirname, '/secret-folder'), {withFileTypes: true}, (err, files) => {
    if (err)
    console.log(err);
  else {
    files.forEach(file => {
        fs.stat(path.join(__dirname, '/secret-folder', file.name), (err, stats) => {
            console.log(file.name, '-', path.extname(file.name).slice(1), '-', stats.size/1000 + 'kb');
        })
    })
  }
});