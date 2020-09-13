
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
var margin = {top: 30, right: 40, bottom: 30, left: 60},
    width = 940 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

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


var svg2 = d3.select("#my_dataviz2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


var svg3 = d3.select("#my_dataviz3")
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
fileInput2='https://raw.githubusercontent.com/yybenjamin/cranFig/master/uncontrol_real.csv'
fileInput3='https://raw.githubusercontent.com/yybenjamin/cranFig/master/uncontrol_sim.csv'
fileInput4='https://raw.githubusercontent.com/yybenjamin/cranFig/master/simulated_cont_res.csv'
fileInput5='https://raw.githubusercontent.com/yybenjamin/cranFig/master/real_cont_res.csv'
fileInput6='https://raw.githubusercontent.com/yybenjamin/cranFig/master/sim_fulltime_constantF_cont_res.csv'
//read constant force approach simulated data
if(plotfig1){
	d3.csv(fileInput).then(function(data) {
	  		data.forEach(function(d) {		   
				pathData.push({'t':parseFloat(d.t1),'d1':d.d1,'v1':d.v1,'u':d.u,'u_max':d.u_max})
			});
	  		plot();
	});
}
//read uncontrol responses from a real case and a simulation
if(plotfig2){
	d3.csv(fileInput2).then(function(data) {
	  		data.forEach(function(d) {		   
				un_real.push({'t':parseFloat(d.t1r),'d1':d.d1r})
			});	
		});
	d3.csv(fileInput3).then(function(data) {
	  		data.forEach(function(d) {		   
				un_sim.push({'t':parseFloat(d.t1s),'d1':d.d1s})
			});	
	  		plot2();
	});
}
//read simulated and real control response data
if(plotfig3){
	d3.csv(fileInput4).then(function(data) {
	  		data.forEach(function(d) {		   
				cont_sim.push({'t':parseFloat(d.t1sc),'d1':d.d1sc})
			});	
		});
	d3.csv(fileInput5).then(function(data) {
	  		data.forEach(function(d) {		   
				cont_real.push({'t':parseFloat(d.t1rc),'d1':d.d1rc})
			});	
	  		plot3();
	});
}

if(plotfig4){
	d3.csv(fileInput3).then(function(data) {
	  		data.forEach(function(d) {		   
				un_sim.push({'t':parseFloat(d.t1s),'d1':d.d1s})
			});	
	});
	d3.csv(fileInput6).then(function(data) {
	  		data.forEach(function(d) {		   
				cont_sim_ft.push({'t':parseFloat(d.t1),'d1':d.d1})
			});	
	  		plot4();
	});
}
//https://raw.githubusercontent.com/sdaityari/my_git_project/master/posts.csv
function plot(){

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

	var axis_3=d3.axisRight(y_3);

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

}


//plot2: generate a chart to compare the real uncontrol response and the simulated uncontrol response
function plot2(){

	var x_1 = d3.scaleLinear()
	  .domain([0,43])
	  .range([ 0, width ]);
	axis_x=svg1.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x_1));-
	axis_x.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');  
	

	// Add Y axis
	var y_1 = d3.scaleLinear()
	  .domain([-1.2, 1.2])
	  .range([ height, 0 ]); 
	axis_lyl=svg1.append("g")
	  .call(d3.axisLeft(y_1));
	axis_lyl.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');    

	// Add the line
	svg1.append("path")
	  .datum(un_real)
	  .attr("fill", "none")
	  .attr("stroke", "black")
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
	axis_lyr=svg1.append("g")
	  .attr("transform", "translate("+0+",0)")
	  .call(axis_2);
	axis_lyr.selectAll('.tick text')
    .attr('font-size', 0)
    .attr('font-family', 'serif')
    .attr('fill', 'orange');  
	
	// Add the line
	svg1.append("path")
	  .datum(un_sim)
	  .attr("fill", "none")
	  .attr("stroke", "orange")
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_2(d.d1); })
	    );




}

//compare control response between real case and simulated case
function plot3(){

	var x_1 = d3.scaleLinear()
	  .domain([0,23])
	  .range([ 0, width ]);
	axis_x=svg2.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x_1));-
	axis_x.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');  
	

	// Add Y axis
	var y_1 = d3.scaleLinear()
	  .domain([-1.2, 1.2])
	  .range([ height, 0 ]); 
	axis_lyl=svg2.append("g")
	  .call(d3.axisLeft(y_1));
	axis_lyl.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');    

	// Add the line
	svg2.append("path")
	  .datum(cont_real)
	  .attr("fill", "none")
	  .attr("stroke", "black")
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
	axis_lyr=svg2.append("g")
	  .attr("transform", "translate("+0+",0)")
	  .call(axis_2);
	axis_lyr.selectAll('.tick text')
    .attr('font-size', 1)
    .attr('font-family', 'serif')
    .attr('fill', 'orange');  
	
	// Add the line
	svg2.append("path")
	  .datum(cont_sim)
	  .attr("fill", "none")
	  .attr("stroke", "orange")
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_2(d.d1); })
	    );
}

function plot4(){

	var x_1 = d3.scaleLinear()
	  .domain([0,43])
	  .range([ 0, width ]);
	axis_x=svg3.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x_1));-
	axis_x.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');  
	

	// Add Y axis
	var y_1 = d3.scaleLinear()
	  .domain([-1.2, 1.2])
	  .range([ height, 0 ]); 
	axis_lyl=svg3.append("g")
	  .call(d3.axisLeft(y_1));
	axis_lyl.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');    

	// Add the line
	svg3.append("path")
	  .datum(cont_sim_ft)
	  .attr("fill", "none")
	  .attr("stroke", "black")
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
	axis_lyr=svg3.append("g")
	  .attr("transform", "translate("+0+",0)")
	  .call(axis_2);
	axis_lyr.selectAll('.tick text')
    .attr('font-size', 0)
    .attr('font-family', 'serif')
    .attr('fill', 'orange');  
	
	// Add the line
	svg3.append("path")
	  .datum(un_sim)
	  .attr("fill", "none")
	  .attr("stroke", "orange")
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_2(d.d1); })
	    );

}

