var Backbone = require("backbone");
var $ = require("jquery");
Backbone.$ = $;
var Marionette = require("backbone.marionette");

var App = new Marionette.Application();

//var HeaderApp = require("./header/header_app");
App.module('header', {
  moduleClass: require("./header/header_app"),
  //container: app.layout.overlay
});

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
    App.channel.command("begin");
    App.channel.trigger("start1");
    console.log(App.channel.request("data"));
    var userChannel = Backbone.Radio.channel('user');
});

App.start();

module.exports = App;
