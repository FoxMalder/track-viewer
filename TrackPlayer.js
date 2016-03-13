function TrackPlayer(options) {
	this._map = options.map;
	this._onLoad = options.onLoad;
	this._onTimeChange = options.onTimeChange;
	
	this._track = null;
	this._speed = 1.0;
	this._currentTime = null;
	this._isPlaying = false;
}

TrackPlayer.UPDATE_CURRENT_TIME_INTERVAL = 100; // ms

TrackPlayer.prototype.load = function(track) {
	
	this._track = track;
	
	this._reset();
		
	if (typeof this._onLoad === "function") {
		this._onLoad(track);
	}
};

TrackPlayer.prototype.play = function() {
	
	if (!this._track || this._isPlaying) {
		return;
	}
	
	this._isPlaying = true;
	
	var endTime = this._track.getEndTime(),
		self = this;
	
	if (this._currentTime === endTime) {
		this._reset();
	}
	
	this._displayCurrentPoint();
		
	this._playTask = setInterval(function(){	
		
		var currentTime = self._currentTime + TrackPlayer.UPDATE_CURRENT_TIME_INTERVAL * self._speed;
		
		if (currentTime >= endTime) {
			currentTime = endTime;
			self.stop();
		}
				
		self.setCurrentTime(currentTime);
		
	}, TrackPlayer.UPDATE_CURRENT_TIME_INTERVAL);
};


TrackPlayer.prototype._reset = function() {
	this._pointIndex = 0;
	this.setCurrentTime(this._track.getStartTime());
};


TrackPlayer.prototype.setCurrentTime = function(currentTime) {
	
	this._currentTime = currentTime;
	
	this._advanceToTime();
		
	if (typeof this._onTimeChange === "function") {
		this._onTimeChange(this._currentTime);
	}	
};


TrackPlayer.prototype._advanceToTime = function() {
	
	if (this._currentTime == this._track.getEndTime()) {
		this._pointIndex = this._track.getPointsCount() - 1;
		this._displayCurrentPoint();
		return;
	}
	
	var nextPointIndex = this._track.findPointIndex(this._currentTime);

	if (nextPointIndex != this._pointIndex) {
		this._pointIndex = nextPointIndex;
		this._displayCurrentPoint();
	}
};


TrackPlayer.prototype._displayCurrentPoint = function() {	
	var point = this._track.getPoint(this._pointIndex);
	this._map.displayPoint(point);
};


TrackPlayer.prototype.stop = function() {	
	
	if (!this._isPlaying) {
		return;
	}
	
	this._isPlaying = false;
	clearInterval(this._playTask);
	this._playTask = null;
};


TrackPlayer.prototype.setSpeed = function(speed) {
	this._speed = speed;
};