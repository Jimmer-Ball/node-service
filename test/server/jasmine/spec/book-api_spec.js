<!-- Run with jasmine-node <path to spec directory> --forceexit -->
describe('Tests for API', function() {
    var request = require('http');
    it("should respond with hello world",
        function(done) {
        request.get("http://localhost:4711/api", function(response){
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});