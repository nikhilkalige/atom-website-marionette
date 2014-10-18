var Backbone = require("backbone");
var PackageModel = require("../models/package");

var PackagesCollection = Backbone.Collection.extend({
    model: PackageModel,

    initialize_contacts: function() {
        var packages = new PackagesCollection([
            {id:1, name: "Docblockr", author: "Nikhil Kalige"},
            {id:2, name: "Git-Log", author: "Vaibhav Bhat"}
        ]);
        return packages.models;
    },
    urlRoot: "http://mslwebdev1.sese.asu.edu:5000",
    url: "http://mslwebdev1.sese.asu.edu:5000/api/package",
    parse: function(response) {
        return response.objects;
    }
});

module.exports = PackagesCollection;
