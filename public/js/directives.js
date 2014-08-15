var townBookDirectives = angular.module('townBookDirectives', []);

townBookDirectives.directive('myFirstDirective', function() {
    // return the directive link function.
    return {
    	scope: { mapMode: '=' },
    	link: function() {
	        console.log("directive confirmed.");

	        /*var color = d3.scale.threshold()
	            .domain([1, 2, 3, 4, 5])
	            .range(["#ddc", "#cdd", "#cdc", "#dcd","ddc"]);
			*/
			var color = d3.scale.threshold()
		        .domain([1, 2, 3, 4, 5, 6, 7, 8])
		        .range(['#4628e8','#4628e8', '#228dea', '#1cecbc', '#16ee27', '#9af00f', '#f3ab09', '#f50202']);

			var width = 700,
			    height = 460;

			var projection = d3.geo.mercator()
			    .center([-71.7, 42])
			    .rotate([0, 0])
			    .scale(11000)
			    .translate([width / 2, height / 2]);

			var path = d3.geo.path()
			    .projection(projection);

			var svg = d3.select("theMap").append("svg")
			    .attr("width", width)
			    .attr("height", height)
			    .attr("xmlns","http://www.w3.org/2000/svg")
			    .attr("version",1.1);  

/*
			var legend = d3.select("legendBoxes").append("svg")
				.attr("width", 210)
			    .attr("height", 30); 

			var legend_labels = d3.select("legendLabels").append("svg")
				.attr("width", 240)
			    .attr("height", 25);     

			legend.selectAll("legend_box").data([1, 2, 3, 4, 5, 6, 7]).enter()
			    .append('rect')
			    	.attr('width','30')
			    	.attr('height','30')
			    	.style('fill',function(d) { return color(d); })  
			    	.attr('x', function(d, i) {return (i*30)})
			    	.attr('y', 0) 
			    ; 

			legend_labels.selectAll("legend_label").data([1, 2, 3, 4, 5, 6, 7]).enter()
				.append('text')
		        	.text(function (d) {return d})
		        	.style('fill','#333')
		        	.style("text-anchor", "left")
		        	.attr('x', function(d, i) {return (22+i*30)})
			    	.attr('y', 25)    
			    ;  */   
			     

			d3.json("MA_Topo_Properties.json", function(error, ma) {
			  svg.selectAll(".town")
			    .data(topojson.feature(ma, ma.objects.MA_Towns).features)
			  .enter()
			  .append("a")
			  	.attr("xlink:href", function(d) { return "/#/towns/" + d.properties.TOWN.toLowerCase().replace(' ','_'); })
			  	.attr("title", function(d) { return d.properties.TOWN; })
			  .append("path")
			    //.attr("class", function(d) { return "town " + d.properties.TOWN; })
			    .attr("class", function(d) { return "town " + d.properties.TOWN; })
			    .style("fill", function(d) { return color(d.properties.victory_district); })
			    .attr("d", path);

			     

			  

			  svg.append("path")
			      .datum(topojson.mesh(ma, ma.objects.MA_Towns, function(a, b) { return a !== b; }))
			      .attr("class", "tract-border")
			      .attr("d", path);  
			  console.log('render map complete');
			  $('#mapLoadSpinner').hide();  
			  $('#legend').show();  


					});

			//console.log(d3.select(".HINGHAM").enter().d.properties.SHAPE_AREA);
			//d3.select(".HINGHAM").attr("title", "selectify!");
			
			}
	}	
});

townBookDirectives.directive('resultsChart', function() {
    // return the directive link function.
    return {
    	scope: {},
    	link: function() {
	        console.log("chart directive confirmed.");
	        
	        //var currentTown="uninit'd";
	        //console.log("scope says " + scope.slugger);
	        /*var currentTown = attrs.mySlug;
	        
			

	        attrs.$observe('mySlug', function() {
		        console.log(attrs.mySlug);
		        currentTown= attrs.mySlug;
		      });*/
	        //console.log("town is " + currentTown);
	        

		}
	}	
});