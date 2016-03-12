describe("TrackPlayer", function() {
	
	var onTimeChangeSpy,
		trackPlayer,
		map;
	
	
	beforeEach(function() {

		jasmine.clock().install();
		
		onTimeChangeSpy = jasmine.createSpy("onTimeChangedSpy");

		map = new TrackMap();

		trackPlayer = new TrackPlayer({
			map : map,
			onTimeChange : onTimeChangeSpy
		});
		
		spyOn(map, 'displayPoint');

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
			level : "1",
			timestamp : 200
		}, {
			x : 50,
			y : 60,
			level : "2",
			timestamp : 300
		}];
				
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
	
	it("should play with speed '1x' by default", function() {

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
		}];
				
		trackPlayer.load(points);
		trackPlayer.play();
		
		jasmine.clock().tick(99);
		
		expect(map.displayPoint).toHaveBeenCalledTimes(1);
		
		jasmine.clock().tick(1);
			
		expect(map.displayPoint).toHaveBeenCalledTimes(2);
	});
	
	it("should react to change speed by adjust time of displaying next point", function() {

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
		}];
				
		trackPlayer.load(points);
		trackPlayer.play();
		
		trackPlayer.setSpeed(10.0);
			
		// current point display time already scheduled - therefore change of speed has no effect for it
		jasmine.clock().tick(100);
		expect(map.displayPoint).toHaveBeenCalledTimes(2);
		
		
		jasmine.clock().tick(9);
		expect(map.displayPoint).toHaveBeenCalledTimes(2);
		
		jasmine.clock().tick(1);
		expect(map.displayPoint).toHaveBeenCalledTimes(3);
		
	});
	
	it("should call 'onTimeChange' handler each time when point is displayed", function() {
		
		var points = [ {
			x : 10,
			y : 20,
			level : "0",
			timestamp : 100
		}, {
			x : 30,
			y : 40,
			level : "1",
			timestamp : 300
		}];
		
		trackPlayer.load(points);
		trackPlayer.play();
		
		expect(onTimeChangeSpy).toHaveBeenCalledTimes(1);
		expect(onTimeChangeSpy).toHaveBeenCalledWith(100);
		
		
		jasmine.clock().tick(200);
		expect(onTimeChangeSpy).toHaveBeenCalledTimes(2);
		expect(onTimeChangeSpy).toHaveBeenCalledWith(300);
		
	});
	
});
