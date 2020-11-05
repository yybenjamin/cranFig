
var pathData=[];
var un_real=[];
var un_sim=[];
var cont_real=[];
var cont_sim=[];
var cont_sim_ft=[];


var plotfig1=0;
var plotfig2=0;
var plotfig3=0;
var plotfig4=1;

// set the dimensions and margins of the graph
var margin = {top: 10, right: 40, bottom:20, left: 60},
    width = 940 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");



var svg1 = d3.select("#my_dataviz1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


fileInput6='https://raw.githubusercontent.com/yybenjamin/cranFig/master/sim_fulltime_constantF_cont_res.csv'

//read uncontrol responses from a real case and a simulation

d3.csv(fileInput3).then(function(data) {
  		data.forEach(function(d) {		   
			un_sim.push({'t':parseFloat(d.t1s),'d1':d.d1s})
		});	
  		plot();
});

// //read simulated and real control response data




function plot(){

	var x_1 = d3.scaleLinear()
	  .domain([0,25])
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
	  .domain([-1, 1])
	  .range([ height, 0 ]); 
	axis_lyl=svg.append("g")
	  .call(d3.axisLeft(y_1));
	axis_lyl.selectAll('.tick text')
    .attr('font-size', 5)
    .attr('font-family', 'serif')
    .attr('fill', 'green');    

	// Add the line
	svg.append("path")
	  .datum(pathData)
	  .attr("fill", "none")
	  .attr("stroke", "green")
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.d1); })
	    );


	// Add Y axis
	var y_2 = d3.scaleLinear()
	  .domain([-1.2, 1.2])
	  .range([ height, 0 ]); 

	var axis_2=d3.axisRight(y_2);  
	axis_lyr=svg.append("g")
	  .attr("transform", "translate("+0+",0)")
	  .call(axis_2);
	axis_lyr.selectAll('.tick text')
    .attr('font-size', 5)
    .attr('font-family', 'serif')
    .attr('fill', 'orange');  
	
	// Add the line
	svg.append("path")
	  .datum(pathData)
	  .attr("fill", "none")
	  .attr("stroke", "orange")
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_2(d.v1); })
	    );




	// Add Y axis
	var y_3 = d3.scaleLinear()
	  .domain([-0.1,0.1])
	  .range([ height, 0 ]); 

	// var axis_3=d3.axisRight(y_3);

	// axis_ryl=svg.append("g")
	//   .attr("transform", "translate("+width+",0)")
	//   .call(axis_3);
	// axis_ryl.selectAll('.tick text')
 //    .attr('font-size', 15)
 //    .attr('font-family', 'serif')
 //    .attr('fill', 'blue');  
	// Add the line
	svg.append("path")
	  .datum(pathData)
	  .attr("fill", "none")
	  .attr("stroke", "blue")
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_3(d.u); })
	    );




	 var y_4 = d3.scaleLinear()
	  .domain([-0.1,0.1])
	  .range([ height, 0 ]); 

	// var axis_3=d3.axisRight(y_3);

	// axis_ryl=svg.append("g")
	//   .attr("transform", "translate("+width+",0)")
	//   .call(axis_3);
	// axis_ryl.selectAll('.tick text')
 //    .attr('font-size', 15)
 //    .attr('font-family', 'serif')
 //    .attr('fill', 'blue');  
	// Add the line
	svg.append("path")
	  .datum(pathData)
	  .attr("fill", "none")
	  .attr("stroke", "black")
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_4(d.u_max); })//y_3 to compare with u_d
	    ); 
}

