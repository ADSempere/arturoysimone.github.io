console.log(new Date().toUTCString()+" starting build.");

const fs = require('fs');
const Handlebars = require("handlebars");
const UglifyJS = require("uglify-js");
var minify = require('html-minifier').minify;

var contents = fs.readFileSync('./templates/index.handlebars', 'utf8');
const template = Handlebars.compile(contents);

function generateHtml(inputFile,outputFile){
    const input = require(inputFile);

    input["link-"+input.lang] = "-active";

    const intro = fs.readFileSync('./templates/'+input.introSrc, 'utf8');
    Handlebars.registerPartial(input.introSrc, intro);
    
    const result = template(input);
    var minHtml = minify(result, {
        removeAttributeQuotes: true
      });
    fs.writeFileSync(outputFile, minHtml, { mode: 0o755 }); 
}

generateHtml('./translations/es.json','../index.html');
generateHtml('./translations/nl.json','../nl.html');

var js = fs.readFileSync('./scripts/script.js', 'utf8');
var minJs = UglifyJS.minify(js);
fs.writeFileSync('../files/script.js', minJs.code, { mode: 0o755 }); 

var uglifycss = require('uglifycss');
var uglified = uglifycss.processFiles(
    [ './styles/reset.css', 
    './styles/style.css' ]
);
fs.writeFileSync('../files/min.css', uglified, { mode: 0o755 }); 

console.log(new Date().toUTCString()+" finished build.");
