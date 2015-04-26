module.exports = function(driver) {
  var webdriver = require('selenium-webdriver');

  describe("ns-slider", function() {
  	
  	beforeEach(function(done) {
  		driver.get('http://localhost:8001/specs/demo/');
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
  		driver.findElement(webdriver.By.xpath("//ns-slider//h3")).getText()
          .then(function(txt) {
              expect(txt).not.toBe("");
              done();
        });
  	});

  	it("should has buttons", function (done) {
  		driver.findElements(webdriver.By.xpath("//ns-slider//a[@id='next'] | //ns-slider//a[@id='prev']"))
          .then(function(elms) {
              expect(elms.length).toBe(2);
              done();
        });
  	});

  	it("should show only one image", function (done) {
  		function visibleImgs(element) {
		  var imgs = element.findElements(webdriver.By.xpath("//ns-slider//img"));
		  return webdriver.promise.filter(imgs, function(img) {
		    return img.isDisplayed();
		  }).then(function(visibleImgs) {
		    return visibleImgs;
		  });
		}

  		driver.findElements(visibleImgs)
          .then(function(elms) {
          	  expect(elms.length).toBe(1);
          	  done();
        });
  	});

  	it("should show next image on next", function (done) {
  		driver.findElement(webdriver.By.xpath("//ns-slider//img[contains(@src, '1.jpg')]")).isDisplayed()
  			.then(function(present) {
  				expect(present).toBe(true);
  				driver.findElement(webdriver.By.xpath("//ns-slider//img[contains(@src, '2.jpg')]")).isDisplayed()
  					.then(function(present) {
  						expect(present).toBe(false);
  						driver.findElement(webdriver.By.xpath("//ns-slider//*[@id='next']")).click();
  						driver.sleep(1000).then(function() {
	  						driver.findElement(webdriver.By.xpath("//ns-slider//img[contains(@src, '1.jpg')]")).isDisplayed()
					  			.then(function(present) {
					  				expect(present).toBe(false);
					  				driver.findElement(webdriver.By.xpath("//ns-slider//img[contains(@src, '2.jpg')]")).isDisplayed()
					  					.then(function(present) {
					  						expect(present).toBe(true);
					  						done();
					  					});
					  			});
	  					});
					});
  			});
	});

	it("should end on last element", function (done) {

		driver.findElement(webdriver.By.xpath("//ns-slider//*[@id='next']")).click();
		driver.sleep(1000).then(function() {
			driver.findElement(webdriver.By.xpath("//ns-slider//*[@id='next']")).click();
			driver.sleep(1000).then(function() {
				driver.findElement(webdriver.By.xpath("//ns-slider//*[@id='next']")).click();
				driver.sleep(1000).then(function() {
					driver.findElement(webdriver.By.xpath("//ns-slider//img[contains(@src, '3.jpg')]")).isDisplayed()
						.then(function(present) {
							expect(present).toBe(true);
							done();
						});
				});
			});
		});
	});


  	it("should show previos image on prev", function (done) {
  		
		driver.findElement(webdriver.By.xpath("//ns-slider//*[@id='next']")).click();
		driver.sleep(1000).then(function() {
	  		driver.findElement(webdriver.By.xpath("//ns-slider//img[contains(@src, '2.jpg')]")).isDisplayed()
	  			.then(function(present) {
	  				expect(present).toBe(true);
	  				driver.findElement(webdriver.By.xpath("//ns-slider//img[contains(@src, '1.jpg')]")).isDisplayed()
	  					.then(function(present) {
	  						expect(present).toBe(false);
	  						driver.findElement(webdriver.By.xpath("//ns-slider//*[@id='prev']")).click();
	  						driver.sleep(1000).then(function() {
		  						driver.findElement(webdriver.By.xpath("//ns-slider//img[contains(@src, '2.jpg')]")).isDisplayed()
						  			.then(function(present) {
						  				expect(present).toBe(false);
						  				driver.findElement(webdriver.By.xpath("//ns-slider//img[contains(@src, '1.jpg')]")).isDisplayed()
						  					.then(function(present) {
						  						expect(present).toBe(true);
						  						done();
						  					});
						  			});
						  	});
						});
	  			});
  		});
	});

	it("should end on first element", function (done) {
		driver.findElement(webdriver.By.xpath("//ns-slider//*[@id='prev']")).click();
		driver.sleep(1000).then(function() {
			driver.findElement(webdriver.By.xpath("//ns-slider//img[contains(@src, '1.jpg')]")).isDisplayed()
				.then(function(present) {
					expect(present).toBe(true);
					done();
				});
		});
	});
  });
}