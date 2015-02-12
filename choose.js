// var routefeature = {
//   'Choose a Route': 'All Roads',
//   RouteName: ["1", "2", "03", "5", "04", "06", "07", "08", "10",
//     "11",
//     "12",
//     "12B", "14", "19", "21", "22", "23", "28", "31", "32", "33", "34", "35",
//     "36", "41", "41S", "42", "43", "44", "45", "46", "47", "51", "53", "54",
//     "57", "80", "81", "84", "85", "86", "9", "96", "A", "B", "C", "D", "DN",
//     "E", "Eb", "F", "G", "Gb", "K", "L", "M1", "M2", "M3", "M4", "NA", "NC",
//     "ND", "NE", "NJ", "NK", "NM", "NO", "NP", "NS", "NT", "NV", "O", "S",
//     "T",
//     "TAC1", "TAC2", "TAC3", "TAC4", "TAC5", "TACD3", "V", "VB", "W", "X",
//     "Y",
//     "Z"
//   ],
//   showStops: function(route) {
//     // d3.json("routes.json", function(collection) {
//     // 	routeG.selectAll("path")
//     // 		.classed("hide", function(d) {
//     // 			if (route != 'All Roads' && d.properties.routeCode != route)
//     // 				return true;
//     // 			else
//     // 				return false;
//     // 		});
//     //
//     // });
//     d3.json("stops.json", function(collection) {
//       stopG.selectAll("circle")
//         .classed("hide", function(d) {
//           if (route != 'All Roads' && d.properties.routeCode != route)
//             return true;
//           else
//             return false;
//         });
//       var lat, lng, level;
//       collection.features.forEach(function(d) {
//         if (d.properties.routeCode == route) {
//           lat = d.geometry.coordinates[1];
//           lng = d.geometry.coordinates[0];
//           level = 13;
//           return;
//         }
//         if (route == 'All Roads') {
//           lat = 46.2317;
//           lng = 6.1765;
//           level = 12;
//           return;
//         }
//       });
//       map.setView([lat, lng], level);

//     })

//   }
// }

RouteName = ["1", "2", "03", "5", "04", "06", "07", "08", "10",
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
];


var FirstClick = true;

var toggles = {

	init: function() {
		$(".toggle-routes").on("click", function() {
			var self = $(this);
			var route = "#" + self.attr("id").replace("toggle-", "");
			var stopcode = self.attr("id").replace("toggle-route-", "");
			// console.log(stopcode);
			if (self.hasClass("active")) {
				$(route).css({
					"stroke-width": "1px",
					"stroke": "#154e80",
				});
				$(".stop[stopid=" + stopcode + "]").css({
					"fill": "#737373"
				});
				$(route).animate({
					opacity: .1
				}, 1000);
				self.removeClass("active");
			} else {
				$(route).css({
					"stroke-width": "5px",
					"stroke": "#6baed6",
				});
				$(".stop[stopid=" + stopcode + "]").css({
					"fill": "yellow"
				});
				$(route).animate({
					opacity: .8
				}, 1000);
				self.addClass("active");
			}
			return false;
		});

		// $("#info").on("click", function() {
		//   window.alert("zz");
		// })


		// $("#route-M4").on("click",function(){
		//     $(this).css({
		//       "stroke-width": "10px",
		//       "stroke": "#6baed6",
		//     });
		// })
		$("#selectAll").on("click", function() {
			$(".toggle-routes").attr('class', "toggle-routes active");
			// $(this).addClass("active");

			for (var i = 1; i < RouteName.length; i++) {
				var name = RouteName[i];
				var self = $("#toggle-route-" + name);
				if (self.length == 0)
					continue;
				var route = "#" + self.attr("id").replace("toggle-", "");
				var stopcode = self.attr("id").replace("toggle-route-", "");
				$(route).css({
					"stroke-width": "5px",
					"stroke": "#6baed6",
				});
				$(".stop[stopid=" + stopcode + "]").css({
					"fill": "yellow"
				});
				$(route).animate({
					opacity: .8
				}, 500);
				self.addClass("active");
			}

			// }
			return false;
		});

		$("#selectNone").on("click", function() {
			$(".toggle-routes").attr('class', "toggle-routes");
			// $(this).removeClass("active");

			for (var i = 1; i < RouteName.length; i++) {
				var name = RouteName[i];
				var self = $("#toggle-route-" + name);
				if (self.length == 0)
					continue;
				var route = "#" + self.attr("id").replace("toggle-", "");
				var stopcode = self.attr("id").replace("toggle-route-", "");
				$(route).css({
					"stroke-width": "1px",
					"stroke": "#154e80",
				});
				$(".stop[stopid=" + stopcode + "]").css({
					"fill": "#737373"
				});
				$(route).animate({
					opacity: .1
				}, 500);
				self.removeClass("active");
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
			var self = $("#menu_animate i");
			// self.hasClass("active") = false;
			if (self.hasClass("fa-pause")) {
				pause();
				animateFlag = false;
				$("#menu_animate .fa-pause").attr('class', "fa fa-play")
					.attr('title', "start animation");
			} else {
				this.fps = 10;
				if (!animateFlag) {
					animate(this.fps);
					animateFlag = true;
					$("#menu_animate .fa-play").attr('class', 'fa fa-pause')
						.attr('title', "pause animation");
				}
			}
			return false;
		});

		$("#menu_reset").on("click", function() {
				var temp = $("#menu_animate i");
				if (temp.hasClass("fa-pause")) {
					// temp.removeClass("fa-pause");
					$("#menu_animate .fa-pause").attr('class', 'fa fa-play');
					reset();
					animateFlag = false;
					// $("#menu_reset .fa-stop").attr('class','fa fa-stop');
				} else {
					// $("#menu_reset .fa-stop").removeClass("fa-stop")
					reset();
					animateFlag = false;
				}
			})
			// .on("mouseover", function() {
			//   var self = d3.select(this).select(".fa-stop");
			//   self.classed("fa-pause",true);
			// })
			// .on("mouseout", function() {
			//   var self = d3.select(this).select(".fa-stop");
			//   self.classed("fa-pause",false);
			// });

		// $(function() {
		// 	$("#fps").slider();
		// })
    

	},

  init: function() {
    $(".toggle-routes").on("click", function() {
      var self = $(this);
      var route = "#" + self.attr("id").replace("toggle-", "");
      var stopcode = self.attr("id").replace("toggle-route-", "");
      if (self.hasClass("active")) {
        $(route).css({
          "stroke-width": "1px",
          "stroke": "#154e80",
        });
        $(".stop[stopid =" + stopcode + "]").css({
          "fill": "#737373"
        });
        $(".bus[busid =" + stopcode + "]").css({
          "visibility": "hidden"
        });
        $(route).animate({
          opacity: .1
        }, 1000);
        self.removeClass("active");

      } else {
        $(route).css({
          "stroke-width": "5px",
          "stroke": "#6baed6",
        });
        $(".stop[stopid =" + stopcode + "]").css({
          "fill": "yellow"
        });
        if (FirstClick) {
          d3.selectAll(".bus").style("visibility", "hidden");
          FirstClick = false;
        }
        $(".bus[busid =" + stopcode + "]").css({
          "visibility": "visible"
        });
        $(route).animate({
          opacity: .8
        }, 1000);
        self.addClass("active");

      }
      return false;
    });

    // $("#info").on("click", function() {
    //   window.alert("zz");
    // })


    // $("#route-M4").on("click",function(){
    //     $(this).css({
    //       "stroke-width": "10px",
    //       "stroke": "#6baed6",
    //     });
    // })
    $("#selectAll").on("click", function() {
      $(".toggle-routes").attr('class', "toggle-routes active");
      // $(this).addClass("active");

      for (var i = 1; i < RouteName.length; i++) {
        var name = RouteName[i];
        var self = $("#toggle-route-" + name);
        if (self.length == 0)
          continue;
        var route = "#" + self.attr("id").replace("toggle-", "");
        var stopcode = self.attr("id").replace("toggle-route-", "");
        $(route).css({
          "stroke-width": "5px",
          "stroke": "#6baed6",
        });
        $(".stop[stopid=" + stopcode + "]").css({
          "fill": "yellow"
        });
        $(route).animate({
          opacity: .8
        }, 500);
        self.addClass("active");
      }
      if (animateFlag)
        d3.selectAll(".bus").style("visibility", "visible");
      return false;
    });

    $("#selectNone").on("click", function() {
      $(".toggle-routes").attr('class', "toggle-routes");
      // $(this).removeClass("active");
      for (var i = 1; i < RouteName.length; i++) {
        var name = RouteName[i];
        var self = $("#toggle-route-" + name);
        if (self.length == 0)
          continue;
        var route = "#" + self.attr("id").replace("toggle-", "");
        var stopcode = self.attr("id").replace("toggle-route-", "");
        $(route).css({
          "stroke-width": "1px",
          "stroke": "#154e80",
        });
        $(".stop[stopid=" + stopcode + "]").css({
          "fill": "#737373"
        });
        $(route).animate({
          opacity: .1
        }, 500);
        self.removeClass("active");
      }
      FirstClick = true;
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
      var self = $("#menu_animate i");
      // self.hasClass("active") = false;
      if (self.hasClass("fa-pause")) {
        pause();
        animateFlag = false;
        $("#menu_animate .fa-pause").attr('class', "fa fa-play")
          .attr('title', "start animation");
      } else {
        fps = 10;
        if (!animateFlag) {
          animate(fps);
          animateFlag = true;
          $("#menu_animate .fa-play").attr('class', 'fa fa-pause')
            .attr('title', "pause animation");
        }
      }
      return false;
    });

    $("#menu_reset").on("click", function() {
        var temp = $("#menu_animate i");
        if (temp.hasClass("fa-pause")) {
          $("#menu_animate .fa-pause").attr('class', 'fa fa-play');
          reset();
          animateFlag = false;
          FirstClick = true;
        } else {
          reset();
          animateFlag = false;
          FirstClick = true;

        }
      })
      // .on("mouseover", function() {
      //   var self = d3.select(this).select(".fa-stop");
      //   self.classed("fa-pause",true);
      // })
      // .on("mouseout", function() {
      //   var self = d3.select(this).select(".fa-stop");
      //   self.classed("fa-pause",false);
      // });

    $( "#fps_slider" ).slider({
          range: "min",
          min: 1,
          max: 20,
          value: 10,
          change: function(event, ui) {
            var value = ui.value;
            if(animateFlag) {
              pause();
              animate(value);
            }else{
              fps = value;
            }
          }
        });
      




  },
};
