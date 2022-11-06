const fs = require('fs');
const path = require('path');

// Generate project-dist directory
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created successfully!');
});

// // Copy all css files content to single file in dist
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

                fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'), 'utf-8').write(data)
            })
        }
    })
  }
});

// // Copy assets to project-dist
fs.readdir(path.join(__dirname, 'assets', 'fonts'), {withFileTypes: true}, (err, files) => {
    if (err) throw err;
  else {
    files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'assets', 'fonts', file.name), path.join(__dirname, 'project-dist', 'assets', 'fonts', file.name),  (err, el) => {
            console.log(file.name, 'is copied');
        })
    })
  }
});

fs.readdir(path.join(__dirname, 'assets', 'img'), {withFileTypes: true}, (err, files) => {
    if (err) throw err;
  else {
    files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'assets', 'img', file.name), path.join(__dirname, 'project-dist', 'assets', 'img', file.name),  (err, el) => {
            console.log(file.name, 'is copied');
        })
    })
  }
});

fs.readdir(path.join(__dirname, 'assets', 'svg'), {withFileTypes: true}, (err, files) => {
    if (err) throw err;
  else {
    files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'assets', 'svg', file.name), path.join(__dirname, 'project-dist', 'assets', 'svg', file.name),  (err, el) => {
            console.log(file.name, 'is copied');
        })
    })
  }
});

// Replace temp lines to relevant html content
fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8').on('data', (data) => {
    console.log('template.html was taken');

    const toReplace = (data.match(/{{\w+}}/g).map(el => el.slice(2).slice(0, -2)));

    for(let i = 0; i<toReplace.length; i++) {
        fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, files) => {
            if (err)
            console.log(err);
          else {
            files.forEach(file => {
                if(file.name === `${toReplace[i]}.html`) {

                    fs.createReadStream(path.join(__dirname, 'components', `${toReplace[i]}.html`), 'utf-8').on('data', (content) => {
                        if (err) throw err;
                        console.log('Nesessary file was found and taken');

                        const replaceRegex = new RegExp('{{' + toReplace[i] + '}}')
                        // const replaceRegex = new RegExp('{{header}}')

                        console.log(replaceRegex);

                        fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8').write(data.replace(replaceRegex, content))
                    })
                }
            })
          }
        });
    }


})

