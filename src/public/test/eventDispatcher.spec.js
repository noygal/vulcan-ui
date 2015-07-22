var assert = require("assert")
var eventsDispatcher = require('../modules/events/eventsDispatcher.js');

describe('Test Event Dispatcher', function() {
    describe('test path store', function() {
        it('should handle events properly', function() {
        	var responseUrl = "";
            eventsDispatcher.pathStore.listen(function(path) {
            	responseUrl = path;
            })
            var url = "testUrl";
            eventsDispatcher.addPath(url);
            assert.equal(url,responseUrl);
        });
    });
});
