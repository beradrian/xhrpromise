jasmine.DEFAULT_TIMEOUT_INTERVAL = 11000;

var XhrPromise = require("../../main/js/xhrpromise.js");


describe("XhrPromiseSpec", function() {
	beforeEach(function() {
		jasmine.Ajax.install();
	});

	afterEach(function() {
		jasmine.Ajax.uninstall();
	});
	
	it('should resolve', function(done) {
		var xhrpromise = XhrPromise.create({method: "GET", url: "/test"})
				.then(function (response) {
					expect(response).toBe("test");
					done();
				});
		
		var request = jasmine.Ajax.requests.mostRecent();
		expect(request.method).toBe('GET');
		expect(request.url).toBe("/test");
		request.respondWith({
			"status": 200,
			"responseText": "test",
			"responseHeaders": {"Access-Control-Allow-Origin": "*"}
		});
	});

	it('should reject', function(done) {
		var xhrpromise = XhrPromise.create({method: "GET", url: "/test-error"})
				.then(function(response) {}, function (response) {
					expect(response.status).toBe(404);
					done();
				});
		
		var request = jasmine.Ajax.requests.mostRecent();
		expect(request.method).toBe('GET');
		expect(request.url).toBe("/test-error");
		request.respondWith({
			"status": 404,
			"responseText": "",
			"responseHeaders": {"Access-Control-Allow-Origin": "*"}
		});
	});
});