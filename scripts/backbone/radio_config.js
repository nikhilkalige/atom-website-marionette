(function(root, factory) {
    var Backbone = require("backbone");
    var $ = require("jquery");
    Backbone.$ = $;
    var Marionette = require("backbone.marionette");
    var Radio = require("backbone.radio");
    var _ = require("underscore");
    module.exports = factory(Marionette, Radio, _);
}(this, function(Marionette, Radio, _) {
    "use strict";

    Marionette.Application.prototype._initChannel = function () {
    this.channelName = _.result(this, "channelName") || "global";
    this.channel = _.result(this, "channel") || Radio.channel(this.channelName);
    };
}));
