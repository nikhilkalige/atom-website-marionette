var Backbone = require("backbone");
var $ = require("jquery");
Backbone.$ = $;
var Marionette = require("backbone.marionette");

var App = new Marionette.Application();

App.addRegions({
    mainRegion: "#main-region"
});

App.on("before:start", function() {
    console.log("before:start");
});

App.addRegions({
    headerRegion: "#header-region",
    mainRegion: "#main-region"
});

App.on("start", function() {
    console.log("Application has started!!");
    Backbone.history.start();
    var userChannel = Backbone.Radio.channel('user');
});

App.start();

module.exports = App;
