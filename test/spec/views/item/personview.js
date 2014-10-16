(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/personview'
		],
		function( Personview ) {

			describe('Personview Itemview', function () {

				it('should be an instance of Personview Itemview', function () {
					var personview = new Personview();
					expect( personview ).to.be.an.instanceof( Personview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );