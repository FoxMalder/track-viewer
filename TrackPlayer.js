function TrackPlayer(options) {
	this._map = options.map;
	this._onLoad = options.onLoad;
	this._onTimeChange = options.onTimeChange;
	
	this._track = null;
	this._speed = 1.0;
	this._currentTime = null;
	this._displayPointStart = null;
	this._displayNextPointTask = null;
	this._updateCurrentTimeTask = null;
}

TrackPlayer.UPDATE_CURRENT_TIME_INTERVAL = 100; // ms

TrackPlayer.prototype.load = function(track) {
	this._track = track;
	this._points = track.points;
	
	if (typeof this._onLoad === "function") {
		this._onLoad(track);
	}
};

TrackPlayer.prototype.play = function() {
	
	var self = this;
	
	if (!this._points || this._points.length === 0) {
		return;
	}
	
	this._pointIndex = 0;	
	this._processPoint(0);
	
	this._setupDisplayNextPoint();
	
	this._updateCurrentTimeTask = setInterval(function(){	
				
		var currentTime = self._points[self._pointIndex].timestamp + self._getDisplayTime();
		self._updateCurrentTime(currentTime);
			
	}, TrackPlayer.UPDATE_CURRENT_TIME_INTERVAL);
};

TrackPlayer.prototype.setSpeed = function(speed) {
	
	var displayTime = this._getDisplayTime();
	this._speed = speed;
	this._resetDisplayNextPointTask(displayTime);		
};

TrackPlayer.prototype.setCurrentTime = function(time) {
	
	this._pointIndex = this._track.findPointIndex(time);
	
	var displayTime = this._points[this._pointIndex].timestamp - time;
	
	this._processPoint(displayTime);
	this._resetDisplayNextPointTask(displayTime);
};

TrackPlayer.prototype._getDisplayTime = function() {
	return (Date.now() - this._displayPointStart) * this._speed;
};

TrackPlayer.prototype._resetDisplayNextPointTask = function(displayTime) {
	if (this._displayNextPointTask) {
		
		clearTimeout(this._displayNextPointTask);
		this._setupDisplayNextPoint(displayTime);
	}
};

TrackPlayer.prototype._setupDisplayNextPoint = function(displayTime) {
	
	displayTime = displayTime || 0;
			
	if (this._pointIndex === this._points.length - 1) {
		clearInterval(this._updateCurrentTimeTask);
		this._displayNextPointTask = null;
		return;
	}
	
	var currentPoint = this._points[this._pointIndex],
		nextPoint = this._points[this._pointIndex + 1],
		delay = (nextPoint.timestamp - currentPoint.timestamp - displayTime) / this._speed,
		self = this;
	
	this._displayNextPointTask = setTimeout(function() {
		
		self._pointIndex++;
		self._processPoint(displayTime);
		self._setupDisplayNextPoint();
		
	}, delay);
	
};

TrackPlayer.prototype._processPoint = function(displayTime) {
	
	var point = this._points[this._pointIndex];
	
	this._map.displayPoint(point);
	this._displayPointStart = Date.now() - displayTime;
	
	this._updateCurrentTime(point.timestamp + displayTime);
};


TrackPlayer.prototype._updateCurrentTime = function(currentTime) {
	this._currentTime = currentTime;
	
	if (typeof this._onTimeChange === "function") {
		this._onTimeChange(this._currentTime);
	}	
};


