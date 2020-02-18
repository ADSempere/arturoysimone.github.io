const fs = require('fs');
const Handlebars = require("handlebars");
const es = require('./es.json');

var contents = fs.readFileSync('./index.handlebars', 'utf8');
const template = Handlebars.compile(contents);

var introEs = fs.readFileSync('./intro.es.handlebars', 'utf8');
Handlebars.registerPartial("intro.es", introEs);

const esResult = template(es);
fs.writeFileSync('../index.html', esResult, { mode: 0o755 });

console.log(esResult);