var townBookControllers = angular.module('townBookControllers', []);


townBookControllers.controller('TownListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $('body').scrollTop(0);
    $http.get('login_check').success(function(resp) {
      if(Boolean(JSON.parse(resp))){
        console.log('tb control');
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
          
          var legendLabelsHeight = 10;
          var legendLabelsColor = '#FFF';
          var box_size = 30;

          switch($scope.orderProp) {
            case "name":
            console.log('map districts');
            clearLegend();
              var data_domain=[1, 2, 3, 4, 5, 6, 7, 8];
              var color = d3.scale.threshold()
                .domain(data_domain)
                .range(['#4628e8','#4628e8', '#228dea', '#1cecbc', '#16ee27', '#9af00f', '#f3ab09', '#f50202']);
               d3.selectAll(".town")
                .style("fill", function(d) { return color(d.properties.victory_district); });

                var legend_width;

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", 210)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", 231)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (20+i*box_size)})
                    .attr('y', legendLabelsHeight)    
              ;  
              break;

            case "p_baker_gains":
              console.log('map p_baker gains');
              clearLegend();
                var data_domain=[0, 3, 6, 9, 12, 15];
              var color = d3.scale.threshold()
                .domain(data_domain)
                .range(['#1D21F5','#3B20D3','#5A20B1','#79208F','#981F6D','#B71F4B','#D61F29']);
               d3.selectAll(".town")
                .style("fill", function(d) { return color(d.properties.baker14 - d.properties.p_baker); });
                var legend_width;

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", 210)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", 231)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (20+i*box_size)})
                    .attr('y', legendLabelsHeight)    
              ; 
              break;

            case "population":
            console.log('map population');

            clearLegend();
              var data_domain=[1, 10, 50, 100, 500, 1000, 2000, 5000];
              var color = d3.scale.threshold()
                .domain(data_domain)
                .range(["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]);
               d3.selectAll(".town")
                .style("fill", function(d) { return color(d.properties.POP2010 / d.properties.SHAPE_AREA * 2.58999e6); });
                var legend_width;

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", 210)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", 231)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (20+i*box_size)})
                    .attr('y', legendLabelsHeight)    
              ; 
              break;

            case "r_deviance_sigma":
              clearLegend();
              var data_domain = [0, 1, 1.5];
              var color = d3.scale.threshold()
                .domain(data_domain)
                .range(['#1D21F5','#6520A5','#AD1F56','#F51F07']);
               d3.selectAll(".town")
                .style("fill", function(d) { 
                  return color(d.properties.r_deviance_sigma); });


              var legend_width = 100;;

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", 210)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", 231)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (20+i*box_size)})
                    .attr('y', legendLabelsHeight)    
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

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", 210)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", 231)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (20+i*box_size)})
                    .attr('y', legendLabelsHeight)    
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

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", 210)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", 231)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (20+i*box_size)})
                    .attr('y', legendLabelsHeight)    
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

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", 210)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", 231)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (20+i*box_size)})
                    .attr('y', legendLabelsHeight)    
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

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", 210)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", 231)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (20+i*box_size)})
                    .attr('y', legendLabelsHeight)    
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

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", 210)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", 231)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (20+i*box_size)})
                    .attr('y', legendLabelsHeight)    
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

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", 210)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", 231)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (20+i*box_size)})
                    .attr('y', legendLabelsHeight)    
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

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", legend_width)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", legend_width)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (5+i*box_size)})
                    .attr('y', legendLabelsHeight)    
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

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", 300)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", 300)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (2+i*(box_size))})
                    .attr('y', legendLabelsHeight)    
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

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", legend_width)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", legend_width)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (i*box_size)})
                    .attr('y', legendLabelsHeight)    
              ; 
              break;       

            default:
             console.log('default');
             clearLegend();
              var data_domain=[1, 2, 3, 4, 5, 6, 7, 8];
              var color = d3.scale.threshold()
                .domain(data_domain)
                .range(['#4628e8','#4628e8', '#228dea', '#1cecbc', '#16ee27', '#9af00f', '#f3ab09', '#f50202']);
               d3.selectAll(".town")
                .style("fill", function(d) { return color(d.properties.victory_district); });

                var legend_width;

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", 210)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", 231)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (20+i*box_size)})
                    .attr('y', legendLabelsHeight)    
              ;  
              break;
          }
          

        }); 
      
        for (var i = 0; i < localStorage.length; i++) {
          $scope.comments.push(localStorage.getItem(localStorage.key(i)));   
          $scope.keys.push(localStorage.key(i));
        }  
      } else{
          console.log('not logged in');
          window.location = "./";
      }
    });

    
  }]);

//************* Insight controller *******************
townBookControllers.controller('InsightsCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $('body').scrollTop(0);
    console.log('insights control');

    $http.get('towns/towns.json').success(function(data) {
      $scope.towns = data;
    });

    function clearLegend() {
      d3.select("legendBoxes").select('svg').remove();
      d3.select("legendLabels").select('svg').remove();
    }  
 
    $scope.orderProp = 'percent_registered_unenrolled';

    $scope.keys = [];
    $scope.comments = [];
    $scope.quantity = 10;

    $scope.$watch("orderProp", function() {
      console.log("orderprop changed to " + $scope.orderProp);
      
      var legendLabelsHeight = 10;
      var legendLabelsColor = '#FFF';
      var box_size = 30;

      switch($scope.orderProp) {
        case "population":
        clearLegend();
          var data_domain=[1, 10, 50, 100, 500, 1000, 2000, 5000];
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]);
           d3.selectAll(".town")
            .style("fill", function(d) { return color(d.properties.POP2010 / d.properties.SHAPE_AREA * 2.58999e6); });
            var legend_width;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", legendLabelsHeight);     

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
                  .style('fill',legendLabelsColor)
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', legendLabelsHeight)    
          ; 
          break;

        case "p_baker_gains":
              console.log('map p_baker gains');
              clearLegend();
                var data_domain=[-3, 0, 3, 6, 9, 12, 15, 18];
              var color = d3.scale.threshold()
                .domain(data_domain)
                .range(["#999DEA", "#999DEA", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000", "#7f0000"]);
               d3.selectAll(".town")
                .style("fill", function(d) { return color(d.properties.baker14 - d.properties.p_baker); });
                var legend_width;

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", 210)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", 231)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (20+i*box_size)})
                    .attr('y', legendLabelsHeight)    
              ; 
              break;


        case "r_deviance_sigma":
          clearLegend();
          var data_domain = [0, 1, 1.5];
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(['#1D21F5','#6520A5','#AD1F56','#F51F07', '#F51F07']);
           d3.selectAll(".town")
            .style("fill", function(d) { 
              return color(d.properties.r_deviance_sigma); });


          var legend_width = 100;;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", legendLabelsHeight);     

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
                  .style('fill',legendLabelsColor)
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', legendLabelsHeight)    
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

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", legendLabelsHeight);     

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
                  .style('fill',legendLabelsColor)
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', legendLabelsHeight)    
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

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", legendLabelsHeight);     

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
                  .style('fill',legendLabelsColor)
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', legendLabelsHeight)    
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

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", legendLabelsHeight);     

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
                  .style('fill',legendLabelsColor)
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', legendLabelsHeight)    
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

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", legendLabelsHeight);     

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
                  .style('fill',legendLabelsColor)
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', legendLabelsHeight)    
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

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", legendLabelsHeight);     

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
                  .style('fill',legendLabelsColor)
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', legendLabelsHeight)    
          ; 
          break;

        case "baker14":
            clearLegend();
              var data_domain=[10, 20, 30, 40, 50, 60,70, 80, 90, 100];
              var color = d3.scale.threshold()
                .domain(data_domain)
                .range(["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]);
               d3.selectAll(".town")
                .style("fill", function(d) { return color(d.properties.baker14); });
                var legend_width;

              var legend = d3.select("legendBoxes").append("svg")
                .attr("width", 210)
                .attr("height", box_size); 

              var legend_labels = d3.select("legendLabels").append("svg")
                .attr("width", 231)
                .attr("height", legendLabelsHeight);     

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
                      .style('fill',legendLabelsColor)
                      .style("text-anchor", "left")
                      .attr('font-size','10px')
                      .attr('x', function(d, i) {return (20+i*box_size)})
                    .attr('y', legendLabelsHeight)    
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

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", legendLabelsHeight);     

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
                  .style('fill',legendLabelsColor)
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', legendLabelsHeight)    
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

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", legend_width)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", legend_width)
            .attr("height", legendLabelsHeight);     

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
                  .style('fill',legendLabelsColor)
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (5+i*box_size)})
                .attr('y', legendLabelsHeight)    
          ; 
          break;    

        case "delta_local_aid_per_capita":
        clearLegend();
          var data_domain=[10,20,30, 40,50, 60,70, 80,90, 100];
          var color = d3.scale.threshold()
            .domain(data_domain)
            .range(['#E1E4F7', '#E5E6F9', '#CCCEF4', '#B2B6EF', '#999DEA', '#7F85E5', '#666DE0', '#4C54DB', '#333CD6', '#1924D1', '#000CCC']);
          
           d3.selectAll(".town")
            .style("fill", function(d) { return color(Math.abs(d.properties.delta_local_aid_per_capita)); });
            var legend_width;

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 300)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 300)
            .attr("height", legendLabelsHeight);     

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
                  .style('fill',legendLabelsColor)
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (2+i*(box_size))})
                .attr('y', legendLabelsHeight)    
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

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", legend_width)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", legend_width)
            .attr("height", legendLabelsHeight);     

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
                  .style('fill',legendLabelsColor)
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (i*box_size)})
                .attr('y', legendLabelsHeight)    
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

          var legend = d3.select("legendBoxes").append("svg")
            .attr("width", 210)
            .attr("height", box_size); 

          var legend_labels = d3.select("legendLabels").append("svg")
            .attr("width", 231)
            .attr("height", legendLabelsHeight);     

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
                  .style('fill',legendLabelsColor)
                  .style("text-anchor", "left")
                  .attr('font-size','10px')
                  .attr('x', function(d, i) {return (20+i*box_size)})
                .attr('y', legendLabelsHeight)    
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
    console.log('detail control');
    $('#parallax_group').scrollTop(0);//animate({'scrollTop': 0})//$('parallax_group').scrollTop(0);
    //window.scrollTo(0,0);//$('body').scrollTop(0);
    
    $scope.storeComment = {};
    $scope.storeComment = function() {
      console.log('saving comment to DB');
      var input = document.getElementById("saveServer");
      var slug = document.getElementById("hiddenSlug");
      console.log('new comment:', input.innerHTML);
      var body = {
        townSlug: slug.innerHTML,
        commentText: input.innerHTML
        //query_value: $scope.comment_id
      };
      /*
      if($scope.comment_id){
        body._id = $scope.comment_id;
      }*/

      $http.post('/addComment', body).success(function(comment) {
        console.log('comment saved:', comment);
        $('#comments_saved').show();
        //$scope.comment = comment.commentText;
      });
    }

  	var slug = $routeParams.townSlug;
    slug = slug.replace(".html","");
    $http.get('townJSON/' + slug + '.json').success(function(data) {
      $scope.town = data;
      console.log('coordinates', data.coordinates);
      $scope.map = {
        center: {
            latitude: data.coordinates[1],
            longitude: data.coordinates[0]
        },
        zoom: 8,
        dragable:'true',
        isReady:true
      };
      
      $scope.townCenter = [{
        latitude: data.coordinates[1],
        longitude: data.coordinates[0]
      }];

      var theMap = document.getElementById("townMap");

      var marker = new google.maps.Marker({
        position:$scope.townCenter,
        map:theMap
      });
      //load comments
      var body = {
        query_attribute:'townSlug',
        query_value:slug
      };
      console.log('get comments query body:',body);
      $http.post('/getComment', body).success(function(comment) {
        console.log('comment loaded:', comment);
        $scope.comment = comment.commentText;
        //$('parallax_base').scrollTop(0);

        //$scope.comment_id = comment._id;
        //console.log('comment id:', comment._id);
      });
      //end load comments
    });

    
/*
    *****
    Pie chart results 2010
    ******
*/
    var width = 200,
        height = 200,
        radius = Math.min(width, height) / 2;

      var red = '#cc334d', blue = '#338ccc', purple = '#9467BD';

      var color = d3.scale.ordinal()
          .range([red, blue, purple]);

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

      /**************
        History Graph
      ************/
      nv.addGraph(function() {
          var chart = nv.models.multiBarChart()
            .transitionDuration(350)
            .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
            .rotateLabels(0)      //Angle to rotate x-axis labels.
            .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
            .groupSpacing(0.1)    //Distance between each group of bars.
            .color(['blue', 'green', 'yellow'])
          ;

          chart.xAxis
              .tickFormat(d3.format(',f'));

          chart.yAxis
              .tickFormat(d3.format(',.1f'));

          d3.select('#results_history svg')
              .datum(exampleData())
              .call(chart);

          nv.utils.windowResize(chart.update);

          return chart;
      });

      //Generate some nice data.
      function exampleData() {
        return stream_layers(3,10+Math.random()*100,.1).map(function(data, i) {
          return {
            key: 'Stream #' + i,
            values: data
          };
        });
      }

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