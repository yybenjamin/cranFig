var cont_sim=[];

// set the dimensions and margins of the graph
var margin = {top: 10, right: 40, bottom:20, left: 60},
    width = 940 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

fin='https://raw.githubusercontent.com/yybenjamin/cranFig/master/init_disturb/R_init_distur_5.csv';

Promise.all([
    d3.csv(fin),
]).then(function(files) {
    files[0].forEach(function(d) {		   
			cont_sim.push({'lr':parseFloat(d.L1)/parseFloat(d.L2),'mr':parseFloat(d.m2)/parseFloat(d.m1),'pr':parseFloat(d.pr)});
		});	
	plot();
}).catch(function(err) {
    // handle error here
})

function plot(){

	var x_1 = d3.scaleLinear()
	  .domain([1,100])
	  .range([ 0, width ]);
	axis_x=svg.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x_1));-
	axis_x.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');  

	// Add Y axis
	var y_1 = d3.scaleLinear()
	  .domain([1, 100])
	  .range([ height, 0 ]); 
	axis_lyl=svg.append("g")
	  .call(d3.axisLeft(y_1));
	axis_lyl.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');    
    // Add the line

	// compute the density data
  var densityData = d3.contourDensity()
    .x(function(d) { return x(d.x); })   // x and y = column name in .csv input data
    .y(function(d) { return y(d.y); })
    .size([width, height])
    .bandwidth(20)    // smaller = more precision in lines = more lines
    (cont_sim)

  // Add the contour: several "path"
  svg.selectAll("path")
    .data(densityData)
    .enter()
    .append("path")
      .attr("d", d3.geoPath())
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-linejoin", "round")

}


  
  // svg.append("g")
  //     .attr("fill", "none")
  //     .attr("stroke", "steelblue")
  //     .attr("stroke-linejoin", "round")
  //   .selectAll("path")
  //   .data(contours)
  //   .enter().append("path")
  //     .attr("stroke-width", (d, i) => i % 5 ? 0.25 : 1)
  //     .attr("d", d3.geoPath());




// contours = d3.contourDensity()
//     .x(d => x(d.x))
//     .y(d => y(d.y))
//     .size([width, height])
//     .bandwidth(30)
//     .thresholds(30)
//   (data)   