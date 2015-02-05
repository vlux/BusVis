function timedata(busdata) {
	passengerPair = [];
	var timeStep_p = 1000 * 900;

	var tlStartIndex = [];
	for (var i = 0; i < busdata.length; i++)
		tlStartIndex.push(0)

	for (var t = startTime; t < endTime; t += timeStep_p) {
		var currPasPair = {
				time: t
			},
			passengerSum = 0;
		$.each(busdata, function(index, item) {
			if (DatetoStamp(item[0].time) >= t) {
				item.passenger = 0;
			} else if (DatetoStamp(item[item.length - 1].time) <= t) {
				item.passenger = 0;
			} else {
				for (var i = tlStartIndex[index]; i < item.length - 1; i++) {
					if ((DatetoStamp(item[i + 1].time) >= DatetoStamp(t)) && (DatetoStamp(t) >
							DatetoStamp(item[i].time))) {
						item.passenger = +item[i].passenger;
						tlStartIndex[index] = i;
						break;
					}
				}
			}
			passengerSum += item.passenger;
		});
		currPasPair.passenger = passengerSum;
		passengerPair.push(currPasPair);
	};

	var formatDate = d3.time.format("%H:%M");

	passengerPair.forEach(function(d) {
		d.timeStr = formatDate(new Date(d.time));
		d.passenger = +d.passenger;
	});


	var margin = {
			top: 20,
			right: 30,
			bottom: 50,
			left: 70
		},
		width = $("#timeline").width() - margin.left - margin.right,
		height = $("#timeline").height() - margin.top - margin.bottom;

	var x = d3.time.scale()
		.domain(d3.extent(passengerPair, function(d) {
			return d.time;
		}))
		.range([0, width])
		.clamp(true);

	var y = d3.scale.linear()
		.domain(d3.extent(passengerPair, function(d) {
			return d.passenger;
		}))
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		.tickFormat(formatDate)
		.ticks(10);

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(5);

	var line = d3.svg.line()
		.x(function(d) {
			return x(d.time);
		})
		.y(function(d) {
			return y(d.passenger);
		});


	var timesvg = d3.select("#timeline").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)

	var timeG = timesvg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	timeG.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	timeG.append("g")
		.attr("class", "y axis")
		.call(yAxis);

	timeG.append("path")
		.datum(passengerPair)
		.attr("class", "line")
		.attr("d", line);

	brush = d3.svg.brush()
		.x(x)
		.extent([0, 0])
		.on("brush", brushed);

	slider = timeG.append("g")
		.attr("class", "slider")
		.call(brush);

	slider.selectAll(".extent,.resize")
		.remove();

	slider.select(".background")
		.attr("height", height);

	handle = slider.append("rect")
		.attr("class", "handle")
		.attr("transform", "translate(0, -6)")
		.attr("width", 2)
		.attr("height", 140);

	slider
		.transition()
		.duration(750)
		.call(brush.extent([startTime, startTime]))
		.call(brush);

	function brushed() {
		value = brush.extent()[0];
		if (d3.event.sourceEvent) {
			value = x.invert(d3.mouse(this)[0]);
			brush.extent([value, value]);

			if (!animateFlag) {
				startTime = new Date(value).getTime()
			} else {
				currTime = new Date(value).getTime()
			}

			for (var i = 0; i < busdata.length; i++)
				startIndex[i] = 0
		}
		handle.attr("x", x(value));
	}
}
