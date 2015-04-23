describe("ns-slider", function() {
	it("should instattinate", function() {
		var ns = new NsSlider();
		expect(ns.is).toEqual("ns-slider");
	});

	it("should set visible element", function() {
		var ns = new NsSlider();

		var elm;
		for (var i=0; i<3; i++) {
			var elm = document.createElement('div');
			elm.className = "slide";
			console.log(ns.getElementByTagName("content"));
		}
		
		ns.setVisibleElement(2);
		var visibles = [];
		var elms = document.querySelectorAll(".slide");
		for (var i=0; i<elms.length; i++) {
			if (elms[i].style.visible != 'none') {
				visibles.push(elms[i]);
			}
		}
		expect(visibles.length).toEqual(1);
	});
});