var Backbone = require("backbone");
var $ = require("jquery");
Backbone.$ = $;
var Marionette = require("backbone.marionette");
var model = require("./models/package");

var collections = require("./collections/packages");
var view = require("./views/item");
var colview = require("./views/list");


var App = new Marionette.Application();

App.addRegions({
    mainRegion: "#main-region"
});

App.on("before:start", function() {
    console.log("Starting");
    var packages = new collections();
    packages.fetch({
        success: function(col, rs, op) {
            //App.packages = packages;
            App.vent.trigger("app:start");
            var list_view = new colview({
                collection: packages
            });

            // var asdf = new view({
            //     model:l
            // });

            App.mainRegion.show(list_view);
        }
    });
});

App.on("app:start", function() {
    console.log("Atom Manager has started!!");

    // var l = new model({
    //     name:"docblockr",
    //     author:"nikhilkalige"
    // });

    // var packages = new collections([
    //     {
    //         "author": "Maximilian Sch\u00fc\u00dfler <git@mschuessler.org>",
    //         "name": "coffeedocs"
    //     },
    //     {
    //         "author": "juanmnl",
    //         "name": "redui-jm-syntax"
    //     },
    //     {
    //         "author": "olistik",
    //         "name": "base16-ocean-dark-spacegray-lighter-invisibles"
    //     },
    //     {
    //         "author": "cseelus",
    //         "name": "lanai-dark-syntax"
    //     },
    //     {
    //         "author": "j4ys0n",
    //         "name": "html-helper"
    //     }
    // ]);

    // var list_view = new colview({
    //     collection: packages
    // });

    // // var asdf = new view({
    // //     model:l
    // // });

    // App.mainRegion.show(list_view);
});

App.start();

module.exports = App;

// define(["marionette"], function(Marionette) {
//     var AtomManager = new Marionette.Application();

//     AtomManager.addRegions({
//     	mainRegion: "#main-region"
//     });

// 	AtomManager.addInitializer(function() {
// 		//document.body.innerHTML = welcomeTmpl({ success: "CONGRATS!" });
// 		//Communicator.mediator.trigger("APP:START");
// 	});

// 	AtomManager.on("initialize:after", function() {
// 		console.log("Contact Manager has started!!");
// 	});

// 	return AtomManager;
// });


