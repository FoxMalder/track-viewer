function Track(points) {
	this.points = points;
}

Track.prototype.findPointIndex = function(time) {
	
	if (this.points.lenght === 1) {
		return 0;
	}
	
	if (time === this.getEndTime()) {
		return this.points.length - 1;
	}
	
	return this.points.findIndex(function(point) {
		return point.timestamp > time;
	}) - 1;
};


Track.prototype.getStartTime = function() {
	
	var startTime;
	
	if (this.points && this.points.length > 0) {
		startTime = this.points[0].timestamp;
	}
	
	return startTime;
};

Track.prototype.getEndTime = function() {
	
	var endTime;
	
	if (this.points && this.points.length > 0) {		
		endTime = this.points[this.points.length - 1].timestamp;
	}
	
	return endTime;
};