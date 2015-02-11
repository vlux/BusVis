function timedata(busdata) {
  passengerPair = [];
  var timeStep_p = 1000 * 60;

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
          if ((DatetoStamp(item[i + 1].time) >= DatetoStamp(t)) && (
              DatetoStamp(t) >
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

  formatDate = d3.time.format("%H:%M");

  passengerPair.forEach(function(d) {
    // d.time = parseDate(d.time);
    d.timeStr = formatDate(new Date(d.time));
    d.passenger = +d.passenger;
  });


  var margin = {
      top: 5,
      right: 10,
      bottom: 50,
      left: 52
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
    .ticks(4);

  var line = d3.svg.line()
    .x(function(d) {
      return x(d.time);
    })
    .y(function(d) {
      return y(d.passenger);
    })
    .interpolate("monotone");


  var timesvg = d3.select("#timeline").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    // .style("visibility", "hidden");


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
    .attr("height", function() {
      return $(window).height() * 0.15;
    });
  // console.log($(timeG[0][0]).offsetLeft)
  $(timeG[0][0]).mousemove(function(e) {
    var x1 = e.originalEvent.x || e.originalEvent.layerX || 0;
    var y1 = e.originalEvent.y || e.originalEvent.layerY || 0;
    // console.log(xx, yy);


    slider.selectAll(".mousehandle").remove();
    slider.selectAll(".texthover").remove();
    mousehandle = slider.append("rect")
      .attr("class", "mousehandle")
      .attr("transform", "translate(" + (x1 - 88) + ", -6)")
      .attr("width", 2)
      .attr("height", function() {
        return $(window).height() * 0.15;
      })
      .style("pointer-events", "none");
    // console.log(xx);

    var texthover = formatDate(x.invert(x1 - 87));
    slider.append("text")
      .attr("class", "texthover")
      .attr("transform", "translate(" + (x1 - 105) + ", 5)")
      .text(texthover)
      .style("fill", "#9ecae1")
      .style("stroke", null)
  })

  $(timeG[0][0]).mouseout(function(e) {
    timeG.selectAll(".mousehandle").remove();
    timeG.selectAll(".texthover").remove();

  })

  slider.transition()
    .duration(750)
    .call(brush.extent([startTime, startTime]))
    .call(brush);

  d3.select("#loading").style("visibility", "hidden");

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
