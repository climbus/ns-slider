module.exports = function(driver) {
  var webdriver = require('selenium-webdriver');

  describe("ns-slider", function() {
  	
  	beforeEach(function(done) {
  		driver.get('http://localhost:8001/demo/');
  		driver.sleep(500).then(function() {
  			done();	
  		});
  	});

  	it("should show on page", function(done) {
  		driver.isElementPresent(webdriver.By.tagName("ns-slider"))
          .then(function(present) {
              expect(present).toBe(true);
              done();
        });
  	});

  	it("should show image", function (done) {
  		driver.isElementPresent(webdriver.By.xpath("//ns-slider//img"))
          .then(function(present) {
              expect(present).toBe(true);
              done();
        });
  	});

  	it("should show title", function (done) {
  		driver.findElement(webdriver.By.xpath("//ns-slider//div[contains(@class, 'title')]")).getText()
          .then(function(txt) {
              expect(txt).not.toBe("");
              done();
        });
  	});
  });
}