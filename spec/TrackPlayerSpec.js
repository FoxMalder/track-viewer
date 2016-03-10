describe("TrackPlayer", function() {
	
	var trackPlayer;

	beforeEach(function() {
		trackPlayer = new TrackPlayer();
	});
		
	
	it("should have a load method", function() {
		expect(trackPlayer.load).toEqual(jasmine.any(Function))

	});
	
});
