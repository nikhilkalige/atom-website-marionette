var Marionette = require("backbone.marionette");
//var tpl = require("./list.hbs");
var PackageItemView = require("./item");

module.exports = Marionette.CollectionView.extend({
    //template: tpl,
    tagName: "ul",
    childView: PackageItemView,
});
