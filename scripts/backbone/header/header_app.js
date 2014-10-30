var Marionette = require("backbone.marionette");
var Radio = require("backbone.radio");
var ListController = require("./list/list_controller");

var HeaderApp = Marionette.Module.extend({
    initialize: function() {
        this.channel = Radio.channel("global");

        // register event listeners
        this.channel.comply({
            //"start": list,
        });
    },

    list: function() {
        var navs = this.channel.request("getnavs");
        new ListController(navs);
    }
});

module.exports = HeaderApp;
