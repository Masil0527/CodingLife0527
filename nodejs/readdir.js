const testFolder = './nodejs';
const fs = require('fs');

fs.readdir(testFolder, function(err, files)
{
    console.log(files);
})