function Map() {
}

Map.prototype.displayPoint = function(point) {
	onTerminalPositionChange(point.x, point.y, point.level);
};
