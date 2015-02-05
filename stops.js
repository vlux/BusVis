d3.json("stops.json", function(collection) {
  collection.features.forEach(function(d) {
    d.LatLng = new L.LatLng(d.geometry.coordinates[1],
      d.geometry.coordinates[0])
  })

  var feature = stopG.selectAll("circle")
    .data(collection.features)
    .enter().append("circle")
    .attr("class", "stop")
    .style("stroke", "black")
    .style("fill", "#737373")
    .attr("r", 3)
    .style("visibility", "hidden");


  map.on("viewreset", update);
  // map.setView([46.2217, 6.1665], 12);
  update();

  function update() {
    feature.attr("transform",
      function(d) {
        return "translate(" +
          map.latLngToLayerPoint(d.LatLng).x + "," +
          map.latLngToLayerPoint(d.LatLng).y + ")";
      })
  }
})
