describe('Sanity Tests for API aliveness', function () {
    var request = require('http');
    it("should respond with 200 OK to route /api",
        function (done) {
            request.get("http://localhost:4711/api", function (response) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    it('should respond with a response body of "The library-service is running" to route /api',
        function (done) {
            request.get("http://localhost:4711/api", function (response) {
                expect(response.statusCode).toBe(200);
                // Receipt of data is asynchronous too
                response.on("data", function(chunk) {
                    // The data is a chunk of bytes, force it to a string by doing a toString on it.
                    expect(chunk.toString()).toEqual("The library-service is running");
                });
                done();
            });
        });
});