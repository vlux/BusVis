var routefeature = {
  'Choose a Route': 'All Roads',
  RouteName: ["All Roads", "1", "2", "03", "5", "04", "06", "07", "08", "10",
    "11",
    "12",
    "12B", "14", "19", "21", "22", "23", "28", "31", "32", "33", "34", "35",
    "36", "41", "41S", "42", "43", "44", "45", "46", "47", "51", "53", "54",
    "57", "80", "81", "84", "85", "86", "9", "96", "A", "B", "C", "D", "DN",
    "E", "Eb", "F", "G", "Gb", "K", "L", "M1", "M2", "M3", "M4", "NA", "NC",
    "ND", "NE", "NJ", "NK", "NM", "NO", "NP", "NS", "NT", "NV", "O", "S",
    "T",
    "TAC1", "TAC2", "TAC3", "TAC4", "TAC5", "TACD3", "V", "VB", "W", "X",
    "Y",
    "Z"
  ],
  showStops: function(route) {
    // d3.json("routes.json", function(collection) {
    // 	routeG.selectAll("path")
    // 		.classed("hide", function(d) {
    // 			if (route != 'All Roads' && d.properties.routeCode != route)
    // 				return true;
    // 			else
    // 				return false;
    // 		});
    //
    // });
    d3.json("stops.json", function(collection) {
      // stopG.selectAll("circle")
      //   .classed("hide", function(d) {
      //     if (route != 'All Roads' && d.properties.routeCode != route)
      //       return true;
      //     else
      //       return false;
      //   });
      var lat, lng, level;
      collection.features.forEach(function(d) {
        if (d.properties.routeCode == route) {
          lat = d.geometry.coordinates[1];
          lng = d.geometry.coordinates[0];
          level = 13;
          return;
        }
        if (route == 'All Roads') {
          lat = 46.2317;
          lng = 6.1765;
          level = 12;
          return;
        }
      });
      map.setView([lat, lng], level);

    })

  }
}

var toggles = {

  init: function() {
    $(".toggle-routes").on("click", function() {
      var self = $(this);
      var route = "#" + self.attr("id").replace("toggle-", "");
      if (self.hasClass("active")) {
        $(route).css({
          "stroke-width": "1px",
          "stroke": "none"
        });
        $(route).animate({
          opacity: .1
        }, 1000);
        self.removeClass("active");
      } else {
        $(route).css({
          "stroke-width": "5px",
          "stroke": "#6baed6"
        });
        $(route).animate({
          opacity: .8
        }, 1000);
        self.addClass("active");
      }
      return false;
    });

    $("#menu_routes").on("click", function() {
      var self = $(this);
      if (self.hasClass("active")) {
        d3.selectAll(".routepath").style("visibility", "hidden");
        self.removeClass("active");
      } else {
        d3.selectAll(".routepath").style("visibility", "visible");
        self.addClass("active");
      }
      return false;
    });

    $("#menu_stops").on("click", function() {
      var self = $(this);
      if (self.hasClass("active")) {
        d3.selectAll(".stop").style("visibility", "hidden");
        self.removeClass("active");
      } else {
        d3.selectAll(".stop").style("visibility", "visible");
        self.addClass("active");
      }
      return false;
    });

    $("#menu_timeline").on("click", function() {
      var self = $(this);
      if (self.hasClass("active")) {
        d3.select("#timeline svg").style("visibility", "hidden");
        self.removeClass("active");
      } else {
        d3.select("#timeline svg").style("visibility", "visible");
        self.addClass("active");
      }
      return false;
    });

    $("#menu_animate").on("click", function() {
      var self = $(this);
      if (self.hasClass("active")) {
        pause();
        animateFlag = false;
        self.removeClass("active");
      } else {
        this.fps = 10;
        if (!animateFlag) {
          animate(this.fps);
          animateFlag = true;
        }
        self.addClass("active");
      }
      return false;
    });

    $("#menu_reset").on("click", function() {
        var temp = $("#menu_animate");
        if (temp.hasClass("active")) {
          temp.removeClass("active");
          reset();
          animateFlag = false;
        }
      })
      .on("mouseover", function() {
        var self = $(this);
        self.addClass("active");
      })
      .on("mouseout", function() {
        var self = $(this);
        self.removeClass("active");
      });

  },
};
