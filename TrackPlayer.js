function TrackPlayer(options) {
	this._map = options.map;
	this._onTimeChange = options.onTimeChange;
	
	this._points = null;
	this._speed = 1.0;
	this._currentTime = null;
}

TrackPlayer.prototype.load = function(points) {
	this._points = points;
};

TrackPlayer.prototype.play = function(points) {
	
	if (!this._points || this._points.length === 0) {
		return;
	}
	
	this._pointIndex = 0;	
	this._processPoint();
	
	this._setupDisplayNextPoint();
};

TrackPlayer.prototype._setupDisplayNextPoint = function() {
		
	if (this._pointIndex === this._points.length - 1) {
		return;
	}
	
	var currentPoint = this._points[this._pointIndex],
		nextPoint = this._points[this._pointIndex + 1],
		delay = (nextPoint.timestamp - currentPoint.timestamp) / this._speed,
		self = this;
	
	setTimeout(function() {
		
		self._pointIndex++;
		self._processPoint();
		self._setupDisplayNextPoint();
		
	}, delay);
	
};

TrackPlayer.prototype._processPoint = function() {
	
	var point = this._points[this._pointIndex];
	
	this._map.displayPoint(point);
	this._currentTime = point.timestamp;
		
	if (typeof this._onTimeChange === "function") {
		this._onTimeChange(this._currentTime);
	}	
};

TrackPlayer.prototype.setSpeed = function(speed) {
	this._speed = speed;
};


