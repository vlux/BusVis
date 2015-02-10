var busdata = [];
var startTime = new Date('2012-10-01 6:00:00').getTime();
var endTime = new Date('2012-10-01 23:00:00').getTime();
var startIndex = [];

d3.json("data/bus_day1_passenger.json", function(collection) {
	$(document).ready(function() {
		// $.ajax({
		// 	type: "GET",
		// 	url: "bus_day1_passenger.json",
		// 	dataType: "json",
		// success: function(data) {
		for (var i in collection)
			busdata.push(collection[i]);
		timedata(busdata);
		// }
		// });
	});
})


var initAnimate = false;

function DatetoStamp(date) {
	var Timestamp = new Date(date).getTime();
	return Timestamp;
}

function animate(fps) {

	var timeStep = 1000 / fps;

	currTime = startTime;

	var feature;

	if (!initAnimate) {
		feature = stopG
			.selectAll(".bus")
			.data(busdata)
			.enter()
			.append("circle")
			.attr("class", "bus")
			.attr("busid", function(d) {
				return d[0].routeCode
			})
			.style("stroke", "black")
			.style("opacity", .6)
			.style("fill", "yellow")
			//.style("visibility", "hidden")
	} else {
		initAnimate = true;
		feature = stopG.selectAll(".bus");
	}

	for (var i = 0; i < busdata.length; i++)
		startIndex.push(0)

	timer = setInterval(function() {
		svg.selectAll(".bus")

		slider.call(brush.extent([currTime, currTime]))
			.call(brush.event);


		//var timeText = svg.append("text")
		var timeText = d3.select(".currTime")
			// .attr("x", )
			// .attr("y", )
			//			.attr("class", "currTime")
			.text(formatDate(new Date(currTime)));
		// .style("line-height",10px);


		$.each(busdata, function(index, item) {
			if (DatetoStamp(item[0].time) >= currTime) {
				item.LatLng = L.latLng(item[0].geo[1], item[0].geo[0]);
				item.passenger = 0;

			} else if (DatetoStamp(item[item.length - 1].time) <= currTime) {
				item.LatLng = L.latLng(item[item.length - 1].geo[1], item[
					item.length -
					1].geo[0]);
				item.passenger = 0;

			} else {

				var currTimeStamp = DatetoStamp(currTime);
				for (var i = startIndex[index]; i < item.length - 1; i++) {
					var nowTimeStamp = DatetoStamp(item[i].time),
						nextTimeStamp = DatetoStamp(item[i + 1].time);
					if ((nextTimeStamp >= currTimeStamp) && (currTimeStamp >
							nowTimeStamp)) {
						var Lat = item[i].geo[1] + (item[i + 1].geo[1] - item[i].geo[
								1]) *
							((currTimeStamp - nowTimeStamp) / (nextTimeStamp -
								nowTimeStamp))
						var Lng = item[i].geo[0] + (item[i + 1].geo[0] - item[i].geo[
								0]) *
							((currTimeStamp - nowTimeStamp) / (nextTimeStamp -
								nowTimeStamp))

						item.LatLng = L.latLng(Lat, Lng);
						item.passenger = Math.sqrt(item[i].passenger) * 0.8;

						startIndex[index] = i;
						break;
					}
				}
			}
		})

		function update() {

			stopG.selectAll(".bus")
				.attr("r", function(d) {
					return d.passenger
				})
				.attr("transform",
					function(d) {
						var point = map.latLngToLayerPoint(d.LatLng);
						return "translate(" +
							point.x + "," + point.y + ")";
					})
		}

		map.on("viewreset", update);
		update();

		currTime = currTime + 1000 * 30;
		startTime = currTime;

	}, timeStep)

}


function pause() {
	clearInterval(timer);
}

function reset() {
	clearInterval(timer);

	var resetTime = new Date('2012-10-01 6:00:00').getTime();

	slider.call(brush.extent([resetTime, resetTime]))
		.call(brush.event);

	for (var i = 0; i < busdata.length; i++)
		startIndex[i] = 0

	startTime = resetTime;

	stopG.selectAll(".bus").remove();
}
