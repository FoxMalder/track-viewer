function TrackMap() {
}

TrackMap.prototype.displayPoint = function(point) {
	onTerminalPositionChange(point.x, point.y, point.level);
};
