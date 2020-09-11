
var pathData=[];
var est_theta=[];



// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 920 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");






// d3.csv('https://raw.githubusercontent.com/yybenjamin/chartplot/master/path.csv', d3.autoType)
// .then(function (data) {

// 	data.forEach(function(d) {
// 		    pathData.push({'t':d.t,'frame':d.frame,'x':d.x,'y':d.y,'z':d.z,'theta':d.theta});//{sn:,title:,src:}
// 		});
//   // console.log(data)
// });

//https://raw.githubusercontent.com/yybenjamin/chartplot/master/path.csv
//https://raw.githubusercontent.com/yybenjamin/chartplot/master/exp-data.csv
//fileInput='https://raw.githubusercontent.com/yybenjamin/cranFig/master/cont_describe.csv';
fileInput='https://raw.githubusercontent.com/yybenjamin/cranFig/master/sim_cont.csv';
d3.csv(fileInput).then(function(data) {
  		data.forEach(function(d) {		   
			pathData.push({'t':parseFloat(d.t1),'d1':d.d1,'v1':d.v1,'u':-d.u,'u_max':d.u_max})
		});
  		plot();
	});


//https://raw.githubusercontent.com/sdaityari/my_git_project/master/posts.csv
function plot(){
	//console.log(pathData[0].t);

	// Add X axis --> it is a date format
	// var x = d3.scaleTime()
	//   .domain(d3.extent(pathData, function(d,i) {  return d.t; }))
	//   .range([ 0, width ]);
	// svg.append("g")
	//   .attr("transform", "translate(0," + height + ")")
	//   .call(d3.axisBottom(x));

	// var x_1 = d3.scaleLinear()
	//   .domain(d3.extent(pathData, function(d,i) {  return d.t; }))
	//   .range([ 0, width ]);
	var x_1 = d3.scaleLinear()
	  .domain([0,5])
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
    .attr('font-size', 15)
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
    .attr('font-size', 15)
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
	  .domain([0.1,-0.1])
	  .range([ height, 0 ]); 

	var axis_3=d3.axisLeft(y_3);  
	axis_ryl=svg.append("g")
	  .attr("transform", "translate("+width+",0)")
	  .call(axis_3);
	axis_ryl.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'blue');  
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

// Add Y axis
	// var y_4 = d3.scaleLinear()
	//   //.domain([d3.min(pathData, function(d,i) {  return +d.u_max; })*1.05, -d3.min(pathData, function(d,i) {  return +d.u_max; })*1.05])
	//   .domain([-0.1,0.1])
	//   .range([ height, 0 ]); 

	// var axis_4=d3.axisRight(y_4);  
	// axis_ryr=svg.append("g")
	//   .attr("transform", "translate("+width+",0)")
	//   .call(axis_4);
	// axis_ryr.selectAll('.tick text')
 //    .attr('font-size', 15)
 //    .attr('font-family', 'serif')
 //    .attr('fill', 'purple');  
	// // Add the line
	// svg.append("path")
	//   .datum(pathData)
	//   .attr("fill", "none")
	//   .attr("stroke", "purple")
	//   .attr("stroke-width", 1.5)
	//   .style("stroke-dasharray", "0 0")
	//   .attr("d", d3.line()
	//     .x(function(d,i) { return x_1(d.t); })
	//     .y(function(d,i) { return y_4(d.u_max); })
	//     )






	// Add the line
	svg.append("path")
	  .datum(pathData)
	  .attr("fill", "none")
	  .attr("stroke", "red")
	  .attr("stroke-width", 1.5)
	  .style("stroke-dasharray", "0 0")
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_4(d.est_theta); })
	    )

	svg.append("line")
	.attr("x1", x_1(116.77))  //<<== change your code here
	.attr("y1", 0)
	.attr("x2", x_1(116.77))  //<<== and here
	.attr("y2", height+50  )
	.style("stroke-width", 1)
	.style("stroke-dasharray", "5 5")
	.style("stroke", "red")
	.style("fill", "none");

	svg.append("line")
	.attr("x1", x_1(14.87))  //<<== change your code here
	.attr("y1", 0)
	.attr("x2", x_1(14.87))  //<<== and here
	.attr("y2", height+50  )
	.style("stroke-width", 1)
	.style("stroke-dasharray", "5 5")
	.style("stroke", "red")
	.style("fill", "none");

	svg.append("line")
	.attr("x1", x_1(47.9))  //<<== change your code here
	.attr("y1", 0)
	.attr("x2", x_1(47.9))  //<<== and here
	.attr("y2", height+50  )
	.style("stroke-width", 1)
	.style("stroke-dasharray", "5 5")
	.style("stroke", "red")
	.style("fill", "none");

	svg.append("line")
	.attr("x1", x_1(94.07))  //<<== change your code here
	.attr("y1", 0)
	.attr("x2", x_1(94.07))  //<<== and here
	.attr("y2", height+50  )
	.style("stroke-width", 1)
	.style("stroke-dasharray", "5 5")
	.style("stroke", "red")
	.style("fill", "none");

	svg.append("line")
	.attr("x1", x_1(176.47))  //<<== change your code here
	.attr("y1", 0)
	.attr("x2", x_1(176.47))  //<<== and here
	.attr("y2", height+50  )
	.style("stroke-width", 1)
	.style("stroke-dasharray", "5 5")
	.style("stroke", "red")
	.style("fill", "none");
}
