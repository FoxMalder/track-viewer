function Track(points) {
	this._points = points;
}

Track.prototype.getPoint = function(i) {
	return this._points[i];
};

Track.prototype.getPointsCount = function() {
	return this._points.length;
};

Track.prototype.findPointIndex = function(time) {
	
	if (this._points.lenght === 1) {
		return 0;
	}
	
	if (time === this.getEndTime()) {
		return this._points.length - 1;
	}
	
	// TODO: use binary search for optimal performance and startIndex parameter
	return this._points.findIndex(function(point) {
		return point.timestamp > time;
	}) - 1;
};



Track.prototype.getStartTime = function() {
	
	var startTime;
	
	if (this._points && this._points.length > 0) {
		startTime = this._points[0].timestamp;
	}
	
	return startTime;
};

Track.prototype.getEndTime = function() {
	
	var endTime;
	
	if (this._points && this._points.length > 0) {		
		endTime = this._points[this._points.length - 1].timestamp;
	}
	
	return endTime;
};