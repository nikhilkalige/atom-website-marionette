var Marionette = require("backbone.marionette");
var tmpl = require("./item.hbs");

module.exports = Marionette.ItemView.extend({
    tagName: "li",
    template: tmpl
});
