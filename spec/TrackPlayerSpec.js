describe("TrackPlayer", function() {
	
	var timerCallback,
		trackPlayer,
		map;
	
	
	beforeEach(function() {

		timerCallback = jasmine.createSpy("timerCallback");
		jasmine.clock().install();

		map = new TrackMap();

		trackPlayer = new TrackPlayer(map);

	});

	
	afterEach(function() {
		jasmine.clock().uninstall();
	});
		
	
	it("should display all points in correct order", function() {

		var points = [ {
			x : 10,
			y : 20,
			level : "0",
			timestamp : 100
		}, {
			x : 30,
			y : 40,
			level : "1",
			timestamp : 200
		}, {
			x : 50,
			y : 60,
			level : "2",
			timestamp : 300
		} ];
		
		spyOn(map, 'displayPoint');
		
		trackPlayer.load(points);
		trackPlayer.play();
		
		jasmine.clock().tick(1000);
		
		expect(map.displayPoint).toHaveBeenCalledTimes(3);
		expect(map.displayPoint).toHaveBeenCalledWith(points[0]);
		expect(map.displayPoint).toHaveBeenCalledWith(points[1]);
		expect(map.displayPoint).toHaveBeenCalledWith(points[2]);
	});
	
	
	it("should delay displaying next point according to calculated relative time", function() {

		var points = [ {
			x : 10,
			y : 20,
			level : "0",
			timestamp : 100
		}, {
			x : 30,
			y : 40,
			timestamp : 200
		}, {
			x : 50,
			y : 60,
			level : "2",
			timestamp : 300
		}];
		
		spyOn(map, 'displayPoint');
		
		trackPlayer.load(points);
		trackPlayer.play();
				
		expect(map.displayPoint).toHaveBeenCalledTimes(1);
		expect(map.displayPoint).toHaveBeenCalledWith(points[0]);
		
		jasmine.clock().tick(99);
		
		expect(map.displayPoint).toHaveBeenCalledTimes(1);
		
		jasmine.clock().tick(1);
		
		expect(map.displayPoint).toHaveBeenCalledTimes(2);
		expect(map.displayPoint).toHaveBeenCalledWith(points[1]);
		
		jasmine.clock().tick(200);
		
		expect(map.displayPoint).toHaveBeenCalledTimes(3);
		expect(map.displayPoint).toHaveBeenCalledWith(points[2]);
	});
	
});
