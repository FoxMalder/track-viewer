describe("TrackMap", function() {
	
	var map;

	beforeEach(function() {
						
		map = new TrackMap();		
		
		// defined by ibgeomap.js that is not included into SpecRunner for simplicity
		window.onTerminalPositionChange = function() {
		};
	});
		
	
	it("should delegate display point calls to global function 'onTerminalPositionChange'", function() {

		spyOn(window, 'onTerminalPositionChange');
		
		map.displayPoint({
			x : 4,
			y : 6,
			level : "8"
		});
		
		expect(window.onTerminalPositionChange).toHaveBeenCalledTimes(1);
		expect(window.onTerminalPositionChange).toHaveBeenCalledWith(4, 6, "8");
	});
	
});
