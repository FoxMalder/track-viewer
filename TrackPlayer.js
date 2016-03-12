function TrackPlayer(options) {
	this._map = options.map;
	this._onTimeChange = options.onTimeChange;
	
	this._points = null;
	this._speed = 1.0;
	this._currentTime = null;
	this._displayPointStart = null;
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

TrackPlayer.prototype.setSpeed = function(speed) {
	
	var oldSpeed = this._speed;
	this._speed = speed;
	
	// reset displaying next point task
	if (this._displayNextPointTask) {
		
		clearTimeout(this._displayNextPointTask);
		var displayingTime = (Date.now() - this._displayPointStart) * oldSpeed;
		this._setupDisplayNextPoint(displayingTime);
	}
};

TrackPlayer.prototype._setupDisplayNextPoint = function(displayingTime) {
	
	displayingTime = displayingTime || 0;
			
	if (this._pointIndex === this._points.length - 1) {
		this._displayNextPointTask = null;
		return;
	}
	
	var currentPoint = this._points[this._pointIndex],
		nextPoint = this._points[this._pointIndex + 1],
		delay = (nextPoint.timestamp - currentPoint.timestamp - displayingTime) / this._speed,
		self = this;
	
	this._displayNextPointTask = setTimeout(function() {
		
		self._pointIndex++;
		self._processPoint();
		self._setupDisplayNextPoint();
		
	}, delay);
	
};

TrackPlayer.prototype._processPoint = function() {
	
	var point = this._points[this._pointIndex];
	
	this._map.displayPoint(point);
	this._displayPointStart = Date.now();
	
	this._currentTime = point.timestamp;
		
	if (typeof this._onTimeChange === "function") {
		this._onTimeChange(this._currentTime);
	}	
};


