const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

const plugins_folder = path.join(__dirname, 'plugins');
const Plugins = fs.readdirSync(plugins_folder).map(file =>
    require(path.join(plugins_folder, file))
);

let Models = {};
const model_files = fs.readdirSync(__dirname).filter(isSchemaFile);
model_files.forEach(file => {
    const name = capitalizeFirstLetter(path.parse(file).name);
    const schema = require(path.join(__dirname, file));
    Plugins.forEach(plugin => schema.plugin(plugin));

    Models[name] = mongoose.model(name, schema);
});

module.exports = Models;



// helper functions
function isSchemaFile (file) {
    return path.extname(file) === '.js' && // is a JS file
        !/\.test\.js$/.test(file) && // is not a test file
        file !== path.basename(__filename); // is not the current file
}

function capitalizeFirstLetter (str) {
    if (typeof str !== "string") throw TypeError(`Expected a string argument, received ${typeof str} ${str}`);

    if (str.length === 0) return "";
    else return str.toUpperCase()[0] + str.substr(1, str.length);
}
