define(["marionette"], function(Marionette) {
    var AtomManager = new Marionette.Application();

    AtomManager.addRegions({
    	mainRegion: "#main-region"
    });

	AtomManager.addInitializer(function() {
		//document.body.innerHTML = welcomeTmpl({ success: "CONGRATS!" });
		//Communicator.mediator.trigger("APP:START");
	});

	AtomManager.on("initialize:after", function() {
		console.log("Contact Manager has started!!");
	});

	return AtomManager;
});
