function TrackPlayer(map) {
	this._map = map;
	this._points = null;
}

TrackPlayer.prototype.load = function(points) {
	this._points = points;
};

TrackPlayer.prototype.play = function(points) {
	
	if (!this._points || this._points.length === 0) {
		return;
	}
	
	this._pointIndex = 0;	
	this._map.displayPoint(this._points[0]);
	
	this._setupDisplayNextPoint();
};

TrackPlayer.prototype._setupDisplayNextPoint = function() {
		
	if (this._pointIndex === this._points.length - 1) {
		return;
	}
	
	var currentPoint = this._points[this._pointIndex],
		nextPoint = this._points[this._pointIndex + 1],
		delay = nextPoint.timestamp - currentPoint.timestamp;
		self = this;
	
	setTimeout(function() {
		
		self._pointIndex++;
		self._map.displayPoint(self._points[self._pointIndex]);
		self._setupDisplayNextPoint();
		
	}, delay);
	
};