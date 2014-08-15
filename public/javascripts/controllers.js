var townBookControllers = angular.module('townBookControllers', []);


townBookControllers.controller('TownListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('towns/towns.json').success(function(data) {
      $scope.towns = data;
    });

    function clearLegend() {
      d3.select("legendBoxes").select('svg').remove();
      d3.select("legendLabels").select('svg').remove();
    }  
 
    $scope.orderProp = 'name';

  	$scope.keys = [];
  	$scope.comments = [];

    $scope.$watch("orderProp", function() {
      console.log("orderprop changed to " + $scope.orderProp);
      


      switch($scope.orderProp) {
        case "name":
        clearLegend();
          var data_domain=[1, 2, 3, 4, 5, 6, 7, 8];
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(['#4628e8','#4628e8', '#228dea', '#1cecbc', '#16ee27', '#9af00f', '#f3ab09', '#f50202']);
           d3.selectAll(".town")
            .style("fill", function(d) { return color(d.properties.victory_district); });

            var legend_width;
          var box_size = 30;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", 25);     

          legend.selectAll("legend_box").data(data_domain).enter()
              .append('rect')
                .attr('width',box_size)
                .attr('height',box_size)
                .style('fill',function(d) { return color(d); })  
                .attr('x', function(d, i) {return (i*box_size)})
                .attr('y', 0) 
              ; 
              

          legend_labels.selectAll("legend_label").data(data_domain).enter()
            .append('text')
                  .text(function (d) {return d})
                  .style('fill','#333')
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', 25)    
          ;  
          break;

        case "population":
        clearLegend();
          var data_domain=[1, 10, 50, 100, 500, 1000, 2000, 5000];
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]);
           d3.selectAll(".town")
            .style("fill", function(d) { return color(d.properties.POP2010 / d.properties.SHAPE_AREA * 2.58999e6); });
            var legend_width;
          var box_size = 30;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", 25);     

          legend.selectAll("legend_box").data(data_domain).enter()
              .append('rect')
                .attr('width',box_size)
                .attr('height',box_size)
                .style('fill',function(d) { return color(d); })  
                .attr('x', function(d, i) {return (i*box_size)})
                .attr('y', 0) 
              ; 
              

          legend_labels.selectAll("legend_label").data(data_domain).enter()
            .append('text')
                  .text(function (d) {return d})
                  .style('fill','#333')
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', 25)    
          ; 
          break;

        case "r_deviance_sigma":
          clearLegend();
          var data_domain = [0, 1, 1.5];
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(['#1D21F5','#6520A5','#AD1F56','#F51F07']);
           d3.selectAll(".town")
            .style("fill", function(d) { return color(d.properties.sigma_r_deviance); });


          var legend_width;
          var box_size = 30;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", 25);     

          legend.selectAll("legend_box").data(data_domain).enter()
              .append('rect')
                .attr('width',box_size)
                .attr('height',box_size)
                .style('fill',function(d) { return color(d); })  
                .attr('x', function(d, i) {return (i*box_size)})
                .attr('y', 0) 
              ; 
              

          legend_labels.selectAll("legend_label").data(data_domain).enter()
            .append('text')
                  .text(function (d) {return d + "σ"})
                  .style('fill','#333')
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', 25)    
          ;  
          break; 

        case "r_deviance":
          clearLegend();
            var data_domain=[5, 10, 15, 20, 25, 30, 35];
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(['#1D21F5','#3B20D3','#5A20B1','#79208F','#981F6D','#B71F4B','#D61F29','#F51F07']);
           d3.selectAll(".town")
            .style("fill", function(d) { return color(d.properties.r_deviance); });
            var legend_width;
          var box_size = 30;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", 25);     

          legend.selectAll("legend_box").data(data_domain).enter()
              .append('rect')
                .attr('width',box_size)
                .attr('height',box_size)
                .style('fill',function(d) { return color(d); })  
                .attr('x', function(d, i) {return (i*box_size)})
                .attr('y', 0) 
              ; 
              

          legend_labels.selectAll("legend_label").data(data_domain).enter()
            .append('text')
                  .text(function (d) {return d + '%'})
                  .style('fill','#333')
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', 25)    
          ; 
          break;   

        case "p_participation":
        clearLegend();
          var data_domain=[34, 38, 43, 47, 52, 56, 61, 65, 70];
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(['#E1E4F7', '#E5E6F9', '#CCCEF4', '#B2B6EF', '#999DEA', '#7F85E5', '#666DE0', '#4C54DB', '#333CD6', '#1924D1', '#000CCC']);
           d3.selectAll(".town")
            .style("fill", function(d) { return color(d.properties.p_participation); });
            var legend_width;
          var box_size = 30;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", 25);     

          legend.selectAll("legend_box").data(data_domain).enter()
              .append('rect')
                .attr('width',box_size)
                .attr('height',box_size)
                .style('fill',function(d) { return color(d); })  
                .attr('x', function(d, i) {return (i*box_size)})
                .attr('y', 0) 
              ; 
              

          legend_labels.selectAll("legend_label").data(data_domain).enter()
            .append('text')
                  .text(function (d) {return d + '%'})
                  .style('fill','#333')
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', 25)    
          ; 
          break; 

        case "percent_registered_unenrolled":
        clearLegend();
          var data_domain=[10, 20, 30, 40, 50, 60, 70, 80];
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]);
           d3.selectAll(".town")
            .style("fill", function(d) { return color(d.properties.p_unenrolled); });
            var legend_width;
          var box_size = 30;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", 25);     

          legend.selectAll("legend_box").data(data_domain).enter()
              .append('rect')
                .attr('width',box_size)
                .attr('height',box_size)
                .style('fill',function(d) { return color(d); })  
                .attr('x', function(d, i) {return (i*box_size)})
                .attr('y', 0) 
              ; 
              

          legend_labels.selectAll("legend_label").data(data_domain).enter()
            .append('text')
                  .text(function (d) {return d + '%'})
                  .style('fill','#333')
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', 25)    
          ; 
          break;  

        case "percent_registered_republicans":
        clearLegend();
          var data_domain = [3, 6, 12, 15, 18, 21, 24, 27];
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]);
           d3.selectAll(".town")
            .style("fill", function(d) { return color(d.properties.p_republican); });
            var legend_width;
          var box_size = 30;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", 25);     

          legend.selectAll("legend_box").data(data_domain).enter()
              .append('rect')
                .attr('width',box_size)
                .attr('height',box_size)
                .style('fill',function(d) { return color(d); })  
                .attr('x', function(d, i) {return (i*box_size)})
                .attr('y', 0) 
              ; 
              

          legend_labels.selectAll("legend_label").data(data_domain).enter()
            .append('text')
                  .text(function (d) {return d + '%'})
                  .style('fill','#333')
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', 25)    
          ; 
 
          break;  

        case "p_baker":
        clearLegend();
          var data_domain=[10, 20, 30, 40, 50, 60,70, 80, 90, 100];
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]);
           d3.selectAll(".town")
            .style("fill", function(d) { return color(d.properties.p_baker); });
            var legend_width;
          var box_size = 30;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", 25);     

          legend.selectAll("legend_box").data(data_domain).enter()
              .append('rect')
                .attr('width',box_size)
                .attr('height',box_size)
                .style('fill',function(d) { return color(d); })  
                .attr('x', function(d, i) {return (i*box_size)})
                .attr('y', 0) 
              ; 
              

          legend_labels.selectAll("legend_label").data(data_domain).enter()
            .append('text')
                  .text(function (d) {return d + '%'})
                  .style('fill','#333')
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', 25)    
          ; 
          break;    

        case "p_patrick":
        clearLegend();
          var data_domain=[10, 20, 30, 40, 50, 60,70, 80, 90, 100]
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(['#E1E4F7', '#E5E6F9', '#CCCEF4', '#B2B6EF', '#999DEA', '#7F85E5', '#666DE0', '#4C54DB', '#333CD6', '#1924D1', '#000CCC']);
           d3.selectAll(".town")
            .style("fill", function(d) { return color(d.properties.p_patrick); });
            var legend_width;
          var box_size = 30;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", 25);     

          legend.selectAll("legend_box").data(data_domain).enter()
              .append('rect')
                .attr('width',box_size)
                .attr('height',box_size)
                .style('fill',function(d) { return color(d); })  
                .attr('x', function(d, i) {return (i*box_size)})
                .attr('y', 0) 
              ; 
              

          legend_labels.selectAll("legend_label").data(data_domain).enter()
            .append('text')
                  .text(function (d) {return d + '%'})
                  .style('fill','#333')
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', 25)    
          ; 
          break;     

        case "unemployment_percentage":
        clearLegend();
          var data_domain=[1,2,3, 4,5, 6,7, 8,9, 10];
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(['#E1E4F7', '#E5E6F9', '#CCCEF4', '#B2B6EF', '#999DEA', '#7F85E5', '#666DE0', '#4C54DB', '#333CD6', '#1924D1', '#000CCC']);
           // .domain([2, 4, 6, 8, 10])
           // .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);
      
           d3.selectAll(".town")
            .style("fill", function(d) { return color(d.properties.unemployment_percentage); });
            var legend_width=300;
          var box_size = 30;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", legend_width)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", legend_width)
            .attr("height", 25);     

          legend.selectAll("legend_box").data(data_domain).enter()
              .append('rect')
                .attr('width',box_size)
                .attr('height',box_size)
                .style('fill',function(d) { return color(d); })  
                .attr('x', function(d, i) {return (i*box_size)})
                .attr('y', 0) 
              ; 
              

          legend_labels.selectAll("legend_label").data(data_domain).enter()
            .append('text')
                  .text(function (d) {return d + '%'})
                  .style('fill','#333')
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (5+i*box_size)})
                .attr('y', 25)    
          ; 
          break;    

        case "delta_local_aid_percentage":
        clearLegend();
          var data_domain=[10,20,30, 40,50, 60,70, 80,90, 100];
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(['#E1E4F7', '#E5E6F9', '#CCCEF4', '#B2B6EF', '#999DEA', '#7F85E5', '#666DE0', '#4C54DB', '#333CD6', '#1924D1', '#000CCC']);
          
           d3.selectAll(".town")
            .style("fill", function(d) { return color(Math.abs(d.properties.delta_local_aid_per_capita)); });
            var legend_width;
          var box_size = 30;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 300)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 300)
            .attr("height", 25);     

          legend.selectAll("legend_box").data(data_domain).enter()
              .append('rect')
                .attr('width',box_size)
                .attr('height',box_size)
                .style('fill',function(d) { return color(d); })  
                .attr('x', function(d, i) {return (i*box_size)})
                .attr('y', 0) 
              ; 
              

          legend_labels.selectAll("legend_label").data(data_domain).enter()
            .append('text')
                  .text(function (d) {return '-$' + d})
                  .style('fill','#333')
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (2+i*(box_size))})
                .attr('y', 25)    
          ; 
          break;   

        case "local_aid_2013":
        clearLegend();
          var data_domain=[20, 40, 60, 80, 100, 120, 140, 160, 180, 200];
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(['#E1E4F7', '#E5E6F9', '#CCCEF4', '#B2B6EF', '#999DEA', '#7F85E5', '#666DE0', '#4C54DB', '#333CD6', '#1924D1', '#000CCC']);
          
           d3.selectAll(".town")
            .style("fill", function(d) { return color(Math.abs(d.properties.local_aid_2013/d.properties.POP2010)); });
            var legend_width=270;
          var box_size = 30;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", legend_width)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", legend_width)
            .attr("height", 25);     

          legend.selectAll("legend_box").data(data_domain).enter()
              .append('rect')
                .attr('width',box_size)
                .attr('height',box_size)
                .style('fill',function(d) { return color(d); })  
                .attr('x', function(d, i) {return (i*box_size)})
                .attr('y', 0) 
              ; 
              

          legend_labels.selectAll("legend_label").data(data_domain).enter()
            .append('text')
                  .text(function (d) {return '$' + d})
                  .style('fill','#333')
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (i*box_size)})
                .attr('y', 25)    
          ; 
          break;       

        default:
         clearLegend();
          var data_domain=[1, 2, 3, 4, 5, 6, 7, 8];
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(['#4628e8','#4628e8', '#228dea', '#1cecbc', '#16ee27', '#9af00f', '#f3ab09', '#f50202']);
           d3.selectAll(".town")
            .style("fill", function(d) { return color(d.properties.victory_district); });

            var legend_width;
          var box_size = 30;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", 25);     

          legend.selectAll("legend_box").data(data_domain).enter()
              .append('rect')
                .attr('width',box_size)
                .attr('height',box_size)
                .style('fill',function(d) { return color(d); })  
                .attr('x', function(d, i) {return (i*box_size)})
                .attr('y', 0) 
              ; 
              

          legend_labels.selectAll("legend_label").data(data_domain).enter()
            .append('text')
                  .text(function (d) {return d})
                  .style('fill','#333')
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', 25)    
          ;  
          break;
      }
      

    }); 
	
    for (var i = 0; i < localStorage.length; i++) {
    	$scope.comments.push(localStorage.getItem(localStorage.key(i)));   
    	$scope.keys.push(localStorage.key(i));
    }	 
  }]);

townBookControllers.controller('TownDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
  	var slug = $routeParams.townSlug;
    slug = slug.replace(".html","");
    $http.get('townJSON/' + slug + '.json').success(function(data) {
      $scope.town = data;
    });
    if(localStorage.getItem(slug))
    	$scope.comment = localStorage.getItem(slug);
    else
    	$scope.comment = '';

    var width = 200,
        height = 200,
        radius = Math.min(width, height) / 2;

      var color = d3.scale.ordinal()
          .range(["#D61F29", "#3B20D3", "#79208F"]);

      var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);

      var pie_results = d3.layout.pie()
          .sort(null)
          .value(function(d) { return d.numVotes; });

      var svg_results = d3.select(".results").append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
         

      d3.csv('votes/' + slug + 'votes.csv', function(error, data) {
        data.forEach(function(d) {
          d.numVotes = +d.numVotes;
        });

        var g = svg_results.selectAll("arc_results")
            .data(pie_results(data))
          .enter().append("g")
            .attr("class", "arc_results");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color(d.data.candidate); });

        g.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .style("fill", "#FFF")
          .text(function(d) { return d.data.candidate; });  
      });

      //*****************************
/*
      var svg_enrollment = d3.select(".enrollment").append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      d3.csv('votes/' + slug + 'votes.csv', function(error, data) {
        data.forEach(function(d) {
          d.numVotes = +d.numVotes;
        });

        var g = svg_results.selectAll("arc_results")
            .data(pie_results(data))
          .enter().append("g")
            .attr("class", "arc_results");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color(d.data.candidate); });

        g.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function(d) { return "dawg"; });  
      }); */   

  }]);