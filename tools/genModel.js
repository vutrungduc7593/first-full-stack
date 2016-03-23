'use strict';

var fs = require('fs');

var Model = process.argv[2];
var model = Model.toLowerCase();
var path = process.cwd();

// Gen Model
var templateModel = "'use strict';\n\n" 
                    + "var mongoose = require('mongoose');\n"
                    + "var Schema = mongoose.Schema;\n\n"
                    + "var " + Model + " = new Schema({\n"
                    + "\n"
                    + "});\n\n"
                    + "module.exports = mongoose.model('" + Model + "', " + Model + ");\n";
                    
fs.writeFile(path + "/app/models/" + model + "s.js", templateModel, function (err) {
    if (err) return console.error(err);
    console.log("The file %s wa saved!", model + "s.js");
});                   

// Gen New Handler
var templateFile = fs.readFileSync(__dirname + '/templateHandler.server.txt').toString();

var newFileContent = templateFile
                .replace(/Temp/g, Model)
                .replace('/Temps/g', Model + 's')
                .replace(/temp/g, model)
                .replace('/temps/g', model + 's');

var newFile = path + '/app/controllers/' + model + "Handler.server.js";

fs.writeFile(newFile, newFileContent, function(err) {
    if (err) return console.error(err);
    console.log("The file %s was saved!", model + "Handler.server.js");
});

// Gen New Test
var templateTestFile = fs.readFileSync(__dirname + '/templateTest.txt').toString();

var newTestFileContent = templateTestFile
                .replace(/Temp/g, Model)
                .replace('/Temps/g', Model + 's')
                .replace(/temp/g, model)
                .replace('/temps/g', model + 's');

fs.writeFile(path + '/test/ut' + Model + 's.js', newTestFileContent, function(err) {
    if (err) return console.error(err);
    console.log("The file %s was saved!", 'ut' + Model + 's.js');
});

// Gen Route
var routeContent = fs.readFileSync(path + '/app/routes/index.js').toString();

routeContent = routeContent
                .replace("// new Handler", "var " + Model + "Handler = require(path + '/app/controllers/" + model + "Handler.server.js');\n// new Handler")
                .replace("// new Handler Instance", "var " + model + "Handler = new " + Model + "Handler();\n    // new Handler Instance")
                .replace("// new Route", "app.route('/api/" + model + "s')\n"
                        + "    	.get(" + model + "Handler.getDocs)\n"
                        + "    	.post("+ model + "Handler.addDoc);\n\n"
                        + "    app.route('/api/" + model + "s/:id')\n"
                        + "    	.get(" + model + "Handler.getDoc)\n"
                        + "    	.put(" + model + "Handler.updateDoc)\n"
                        + "    	.delete(" + model + "Handler.deleteDoc);\n\n"
                        + "    // new Route");
                
fs.writeFile(path + '/app/routes/index.js', routeContent, function(err) {
    if (err) return console.error(err);
    console.log("The file %s was saved!", 'indexTest.js');
});