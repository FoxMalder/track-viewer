describe("TrackPlayer", function() {
	
	var onTimeChangeSpy,
		trackPlayer,
		map;
	
	
	beforeEach(function() {

		jasmine.clock().install();
		
		onTimeChangeSpy = jasmine.createSpy("onTimeChangedSpy");
		onLoadSpy = jasmine.createSpy("onLoadSpy");

		map = new TrackMap();

		trackPlayer = new TrackPlayer({
			map : map,
			onLoad : onLoadSpy,
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
				
		trackPlayer.load(new Track(points));
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
				
		trackPlayer.load(new Track(points));
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
				
		trackPlayer.load(new Track(points));
		trackPlayer.play();
		
		jasmine.clock().tick(99);
		
		expect(map.displayPoint).toHaveBeenCalledTimes(1);
		
		jasmine.clock().tick(1);
			
		expect(map.displayPoint).toHaveBeenCalledTimes(2);
	});
	
	it("should react to change speed by adjust time of displaying current point", function() {
		
		jasmine.clock().mockDate();

		var points = [ {
			x : 10,
			y : 20,
			level : "0",
			timestamp : 100
		}, {
			x : 30,
			y : 40,
			level : "1",
			timestamp : 600
		}];
				
		trackPlayer.load(new Track(points));
		trackPlayer.play();
		
		jasmine.clock().tick(400); // 200 ms left
		
		trackPlayer.setSpeed(2.0); // 200/2 = 100 ms left
			
		jasmine.clock().tick(99);
		expect(map.displayPoint).toHaveBeenCalledTimes(1);
		
		jasmine.clock().tick(1);
		expect(map.displayPoint).toHaveBeenCalledTimes(2);
		
	});
	
	it("should call 'onTimeChange' handler each TrackPlayer.UPDATE_CURRENT_TIME_INTERVAL ms while playing", function() {
		
		jasmine.clock().mockDate();
				
		var points = [ {
			x : 10,
			y : 20,
			level : "0",
			timestamp : 100
		}, {
			x : 30,
			y : 40,
			level : "1",
			timestamp : 600
		}];
		
		trackPlayer.load(new Track(points));
		trackPlayer.play();
				
		jasmine.clock().tick(100);
		expect(onTimeChangeSpy).toHaveBeenCalledWith(200);
		
		jasmine.clock().tick(100);
		expect(onTimeChangeSpy).toHaveBeenCalledWith(300);
		
		jasmine.clock().tick(100);
		expect(onTimeChangeSpy).toHaveBeenCalledWith(400);
					
	});
	
	it("should call 'onLoad' handler when 'load()' method is called", function() {
		
		trackPlayer.load(new Track([{
			x : 10,
			y : 20,
			level : "0",
			timestamp : 100
		}]));
		expect(onLoadSpy).toHaveBeenCalled();
		
	});	
});
