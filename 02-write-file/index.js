const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8')

rl.on('line', (input) => {
    if (input === 'exit') {
        rl.close()
    }
    else writeStream.write(input)
});

rl.question('What do you think of Node.js? ', (answer) => {
    if (answer === 'exit') {
        rl.close()
    }
    else writeStream.write(answer)
});

rl.on('SIGINT', () => {
    console.log('Exiting process...');
    rl.close();
});