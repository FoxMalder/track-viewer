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
	var index;
	
	for(var i = 0; i < this._points.length; i++) {
		var point = this._points[i];
		
		if (point.timestamp > time) {
			index = i - 1;
			break;
		}
	}
	
	return index;
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