const fs = require('fs');
const Handlebars = require("handlebars");

var contents = fs.readFileSync('./index.handlebars', 'utf8');
const template = Handlebars.compile(contents);

function generateHtml(inputFile,outputFile){
    const input = require(inputFile);

    const intro = fs.readFileSync('./'+input.introSrc, 'utf8');
    Handlebars.registerPartial(input.introSrc, intro);
    
    const result = template(input);
    fs.writeFileSync(outputFile, result, { mode: 0o755 }); 
}

generateHtml('./es.json','../index.html');