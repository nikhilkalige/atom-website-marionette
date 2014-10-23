define([
	'backbone',
	'views/item/personview',
	'hbs!tmpl/composite/peopleview_tmpl'
],
function( Backbone, Personview, PeopleviewTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a Peopleview CompositeView");
		},
		
    	itemView: Personview,
    	
    	template: PeopleviewTmpl,
    	

    	/* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: "",

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
