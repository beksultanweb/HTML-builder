const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
    if (err)
    console.log(err);
  else {
    files.forEach(file => {
        console.log(path.extname(file.name).slice(1));
        if(path.extname(file.name).slice(1) === 'css') {

            fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8').on('data', (data) => {
                if (err) throw err;
                console.log('File was read');

                fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8').write(data)
            })
        }
    })
  }
});