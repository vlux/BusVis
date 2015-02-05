function project(point) {
	var latlng = new L.LatLng(point[1], point[0]);
	var layerPoint = map.latLngToLayerPoint(latlng);
	return [layerPoint.x, layerPoint.y];
}

var routeID = function(d, i) {
	return "route-" + d.properties.routeCode;
};

d3.json("routes.json", function(collection) {

	var path = d3.geo.path().projection(project);

	var feature = routeG.selectAll("path")
		.data(collection.features)
		.enter().append("path")
		.attr("class", "routepath")
		.attr("id", routeID)
		.attr("d", d3.geo.path())
		// .style("visibility", "hidden")
		.style("stroke", "#154e80")
		.style("fill", "none")
		.style('stroke-width', "0.5px")
		.style("fill-opacity", 2.5);

	reset();

	map.on("viewreset", reset);
	map.setView([46.2217, 6.1665], 12);

	function reset() {
		bounds = [
			[map.getBounds()._southWest.lng, map.getBounds()._southWest.lat],
			[map.getBounds()._northEast.lng, map.getBounds()._northEast.lat]
		]
		var bottomLeft = project(bounds[0]),

			topRight = project(bounds[1]);

		svg.attr("width", topRight[0] - bottomLeft[0])
			.attr("height", bottomLeft[1] - topRight[1])
			.style("margin-left", bottomLeft[0] + "px")
			.style("margin-top", topRight[1] + "px");

		g.attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] +
			")");

		feature.attr("d", path);
	}
})
