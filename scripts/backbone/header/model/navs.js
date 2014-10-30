var Backbone = require("backbone");
var Radio = require("backbone.radio");

var nav = require("./nav");

var navs = Backbone.Collection.extend({
    model: nav,

    initialize: function() {
        Radio.reply("global", "getnavs", getNavList);
    },

    getNavList: function() {
        return "HOlly Moly";
    }
});

module.exports = navs;
