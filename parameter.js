var animateFlag = false;

var ParameterManager = function() {

  this.routes = false;
  // d3.selectAll(".routepath").style("visibility", "hidden");
  this.stops = false;
  // d3.selectAll(".stop").style("visibility", "hidden");

  this.animate = function() {
    if (!animateFlag) {
      animate(this.fps);
      animateFlag = true;
    }
  };
  this.fps = 10;
  this.pause = function() {
    pause();
    animateFlag = false;
  };
  this.reset = function() {
    reset();
    animateFlag = false;
  }
  this.timeline = function() {
    timeline();
  }
}

window.onload = function() {
  var text = new ParameterManager();
  var gui = new dat.GUI();
  var Folder = gui.addFolder('Bus Vis in Geneva');
  Folder.open();

  Folder.add(text, 'routes').onChange(function(flag) {
    var param = flag ? "visible" : "hidden"
    d3.selectAll(".routepath").style("visibility", param);
  })
  Folder.add(text, 'stops').onChange(function(flag) {
    var str = flag ? "visible" : "hidden"
    d3.selectAll(".stop").style("visibility", str);
  })

  var animateFolder = Folder.addFolder('Traffic Visualize');
  animateFolder.open();

  animateFolder.add(text, 'animate');

  animateFolder.add(text, 'pause');

  animateFolder.add(text, 'reset');

  animateFolder.add(text, 'fps', 1, 20).onFinishChange(function(d) {
    pause();
    // console.log(animateFlag)
    animate(d);
  });

  var passengerFolder = Folder.addFolder('Passenger Visualize');

  passengerFolder.add(text, 'timeline');
  passengerFolder.open();


  var chooseFolder = Folder.addFolder('Choose Specific Route');

  chooseFolder.add(routefeature, 'Choose a Route', routefeature.RouteName).onChange(
    function(route) {
      routefeature.showStops(route);
      routeG.selectAll(".routepath")
        .style("stroke", function(d) {
          if (route != 'All Roads' && d.properties.routeCode != route)
            return "#08306b"
          else
            return "#6baed6"
        });
      stopG.selectAll("circle.stop")
        .style("fill", function(d) {
          if (route != 'All Roads' && d.properties.routeCode != route)
            return "#737373";
          else
            return "#a8ddb5"
        });
    });
  chooseFolder.open();

}
