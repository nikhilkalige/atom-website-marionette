define([
	'backbone',
	'hbs!tmpl/item/personview_tmpl'
],
function( Backbone, PersonviewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Personview ItemView");
		},
		
    	template: PersonviewTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
