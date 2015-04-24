describe("ns-slider", function() {
	it("should instattinate", function() {
		var ns = new NsSlider();
		expect(ns.is).toEqual("ns-slider");
	});

	describe("inserted in html", function() {

		beforeEach(function() {
			this.container = document.createElement('div');
			this.container.innerHTML = "<ns-slider> \
									<div class=\"slide\">slide1</div>\
									<div class=\"slide\">slide2</div>\
									<div class=\"slide\">slide3</div>\
								  </ns-slider>";
			
			document.body.appendChild(this.container);
		});

		it("should be only one visible element", function() {
			
			var ns = document.querySelector("ns-slider");

			var visibles = [];
			var elms = ns.querySelectorAll(".slide");
			for (var i=0; i<elms.length; i++) {
				if (elms[i].style.display != 'none') {
					visibles.push(elms[i]);
				}
			}
			expect(visibles.length).toEqual(1);
		});

		it("should set visible element", function() {
			var ns = document.querySelector("ns-slider");
			ns.setVisibleElement(1);

			var visibles = [];
			var elms = ns.querySelectorAll(".slide");
			for (var i=0; i<elms.length; i++) {
				if (elms[i].style.display != 'none') {
					visibles.push(elms[i]);
				}
			}
			expect(visibles.length).toEqual(1);
			expect(visibles[0].innerHTML).toEqual("slide2");
		});

		it("should return elms number", function() {
			var ns = document.querySelector("ns-slider");
			var elms = ns.querySelectorAll(".slide");
			expect(ns.count()).toEqual(elms.length);
		});

		it("should call callback after animation", function(done) {
			var ns = document.querySelector("ns-slider");
			ns.animate(1, 2, function() {
				expect(true).toBe(true);
				done();
			});
		});

		afterEach(function() {
			document.body.removeChild(this.container);
		});
	});
});