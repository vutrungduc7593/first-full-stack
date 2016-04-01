'use strict';

var fs = require('fs');
var pluralize = require('pluralize');

var input = process.argv[2].toLowerCase();

var Model = input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
var ModelsString = pluralize(Model);
var model = Model.toLowerCase();
var modelsString = ModelsString.toLowerCase();
var path = process.cwd();

// Gen Model
var templateModel = "'use strict';\n\n" 
                    + "var mongoose = require('mongoose');\n"
                    + "var Schema = mongoose.Schema;\n\n"
                    + "var " + Model + " = new Schema({\n"
                    + "\n"
                    + "});\n\n"
                    + "module.exports = mongoose.model('" + Model + "', " + Model + ");\n";
                    
fs.writeFile(path + "/app/models/" + modelsString + ".js", templateModel, function (err) {
    if (err) return console.error(err);
    console.log("The file %s was saved!", modelsString + ".js");
});

// Gen New Handler
var templateFile = fs.readFileSync(__dirname + '/templateHandler.server.txt').toString();

var newFileContent = templateFile
                .replace(/Temps/g, ModelsString)
                .replace(/temps/g, modelsString)
                .replace(/Temp/g, Model)
                .replace(/temp/g, model);

var newFile = path + '/app/controllers/' + model + "Handler.server.js";

fs.writeFile(newFile, newFileContent, function(err) {
    if (err) return console.error(err);
    console.log("The file %s was saved!", model + "Handler.server.js");
});

// Gen Test Unit
var templateTestFile = fs.readFileSync(__dirname + '/templateTest.txt').toString();

var newTestFileContent = templateTestFile
                .replace(/Temps/g, ModelsString)
                .replace(/temps/g, modelsString)
                .replace(/Temp/g, Model)
                .replace(/temp/g, model);

fs.writeFile(path + '/test/unit/' + model + '.js', newTestFileContent, function(err) {
    if (err) return console.error(err);
    console.log("The file %s was saved!", model + '.js');
});

// Gen Route
var routeContent = fs.readFileSync(path + '/app/routes/index.js').toString();

routeContent = routeContent
                .replace("// new Handler", "var " + Model + "Handler = require(path + '/app/controllers/" + model + "Handler.server.js');\n// new Handler")
                .replace("// new Handler Instance", "var " + model + "Handler = new " + Model + "Handler();\n    // new Handler Instance")
                .replace("// new Route", "app.route('/api/" + modelsString + "')\n"
                        + "    	.get(" + model + "Handler.get" + ModelsString + ")\n"
                        + "    	.post("+ model + "Handler.add" + Model + ");\n\n"
                        + "    app.route('/api/" + modelsString + "/:id')\n"
                        + "    	.get(" + model + "Handler.get" + Model + ")\n"
                        + "    	.put(" + model + "Handler.update" + Model + ")\n"
                        + "    	.delete(" + model + "Handler.delete" + Model + ");\n\n"
                        + "    // new Route");
                
fs.writeFile(path + '/app/routes/index.js', routeContent, function(err) {
    if (err) return console.error(err);
    console.log("The file %s was saved!", 'index.js');
});