const fs = require('fs');
module.exports = (app) =>{
    fs.readFileSync(__dirname).forEach(file=>{
        if(file === 'index.js'){
            return;
        }
    })
}