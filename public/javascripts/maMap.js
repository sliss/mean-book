function mapMA(){

var color = d3.scale.threshold()
    .domain([1, 10, 50, 100, 500, 1000, 2000, 5000])
    .range(["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]);


var width = 1000,
    height = 600;

var projection = d3.geo.mercator()
    .center([-72, 42])
    .rotate([0, 0])
    .scale(11000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);      

d3.json("MA_Towns_Topo.json", function(error, ma) {
  svg.selectAll(".town")
    .data(topojson.feature(ma, ma.objects.MA_Towns).features)
  .enter().append("path")
    //.attr("class", function(d) { return "town " + d.properties.TOWN; })
    .attr("class", function(d) { return "town " + 'CLA'+(mod(d.properties.POP2010)).toString(); })
    .style("fill", function(d) { return color(d.properties.POP2010 / d.properties.SHAPE_AREA * 2.58999e6); })

    .attr("d", path);

  svg.append("path")
      .datum(topojson.mesh(ma, ma.objects.MA_Towns, function(a, b) { return a !== b; }))
      .attr("class", "tract-border")
      .attr("d", path);  
});
}