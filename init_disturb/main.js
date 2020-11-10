
var cont_sim5=[];
var L1=5.36,L2=0.81;
var init5deg=5/180*3.1415926*L1,init10deg=10/180*3.1415926*L1,init15deg=15/180*3.1415926*L1,init20deg=20/180*3.1415926*L1;
var cont_sim10=[];
var cont_sim15=[];
var cont_sim20=[];

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



var svg1 = d3.select("#my_dataviz1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


fin5='https://raw.githubusercontent.com/yybenjamin/cranFig/master/init_disturb/R_init_distur_5.csv';
fin10='https://raw.githubusercontent.com/yybenjamin/cranFig/master/init_disturb/R_init_distur_10.csv';
fin15='https://raw.githubusercontent.com/yybenjamin/cranFig/master/init_disturb/R_init_distur_15.csv';
fin20='https://raw.githubusercontent.com/yybenjamin/cranFig/master/init_disturb/R_init_distur_20.csv';

//read uncontrol responses from a real case and a simulation

// d3.csv(fin5).then(function(data) {
//   		data.forEach(function(d) {		   
// 			cont_sim5.push({'t':parseFloat(d.t1),'d1':d.d1,'u':d.u,'u_max':d.u_max})
// 		});	
// 		console.log('fin')
//   		plot();
// });

// //read simulated and real control response data

Promise.all([
    d3.csv(fin5),
    d3.csv(fin10),
    d3.csv(fin15),
    d3.csv(fin20),
]).then(function(files) {
	
    // files[0] will contain file1.csv
    //console.log(files[0])
    // files[1] will contain file2.csv
    files[0].forEach(function(d) {		   
			cont_sim5.push({'t':parseFloat(d.t1),'d1':d.d1,'u':(parseFloat(d.u)-0.6).toString(),'u_max':d.u_max})
		});	
    files[1].forEach(function(d) {		   
			cont_sim10.push({'t':parseFloat(d.t1),'d1':d.d1,'u':(parseFloat(d.u)-0.3).toString(),'u_max':d.u_max})
		});	
    files[2].forEach(function(d) {		   
		cont_sim15.push({'t':parseFloat(d.t1),'d1':d.d1,'u':(parseFloat(d.u)+0.3).toString(),'u_max':d.u_max})
	});
    files[3].forEach(function(d) {		   
		cont_sim20.push({'t':parseFloat(d.t1),'d1':d.d1,'u':(parseFloat(d.u)+0.6).toString(),'u_max':d.u_max})
	});	
	plot();
	plot1();
	
}).catch(function(err) {
    // handle error here
})
function plot(){

	var x_1 = d3.scaleLinear()
	  .domain([0,30])
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
    .attr('fill', 'black');    
    // Add the line

	svg.append("path")
	  .datum(cont_sim5)
	  .attr("fill", "none")
	  .attr("stroke", "green")
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.d1/init5deg); })
	    );
	svg.append("path")
	  .datum(cont_sim10)
	  .attr("fill", "none")
	  .attr("stroke", "orange")
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.d1/init10deg); })
	    );
	svg.append("path")
	  .datum(cont_sim15)
	  .attr("fill", "none")
	  .attr("stroke", "red")
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.d1/init15deg); })
	    );
	svg.append("path")
	  .datum(cont_sim20)
	  .attr("fill", "none")
	  .attr("stroke", "blue")
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.d1/init20deg); })
	    );

}

function plot1(){

	var x_1 = d3.scaleLinear()
	  .domain([0,30])
	  .range([ 0, width+0]);
	axis_x=svg1.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x_1));
	axis_x.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');  
	

	axis_x2=svg1.append("g")
	  .attr("transform", "translate(0," + height/2 + ")")
	  .call(d3.axisBottom(x_1).tickSize(0));

	axis_x2.selectAll('.tick text')
    .attr('font-size', 0)
    .attr('font-family', 'serif')
    .attr('fill', 'black');    
   

	// Add Y axis
	var y_1 = d3.scaleLinear()
	  .domain([-1, 1])
	  .range([ height, 0 ]); 
	// axis_lyl=svg1.append("g")
	//   .call(d3.axisLeft(y_1));
	// axis_lyl.selectAll('.tick text')
 //    .attr('font-size', 1)
 //    .attr('font-family', 'serif')
 //    .attr('fill', 'black');    

	
	// Add Y axis
	var y_2 = d3.scaleLinear()
	  .domain([-12, 12])
	  .range([ height, 0 ]); 

	var axis_2=d3.axisLeft(y_2);  
	axis_lyr=svg1.append("g")
	  .attr("transform", "translate("+0 +",0)")
	  .call(axis_2);
	axis_lyr.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');  
	
	// Add the line
	svg1.append("path")
	  .datum(cont_sim5)
	  .attr("fill", "none")
	  .attr("stroke", "green")
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.u); })

	    );

	// Add the line
	svg1.append("path")
	  .datum(cont_sim5)
	  .attr("fill", "none")
	  .attr("stroke", "green")
	  .style("stroke-dasharray", ("3, 3"))
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_2(d.u_max); })

	    );

	svg1.append("path")
	  .datum(cont_sim10)
	  .attr("fill", "none")
	  .attr("stroke", "orange")
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.u); })

	    );	  
	svg1.append("path")
	  .datum(cont_sim10)
	  .attr("fill", "none")
	  .attr("stroke", "orange")
	  .style("stroke-dasharray", ("3, 3"))
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_2(d.u_max); })

	    );
	svg1.append("path")
	  .datum(cont_sim15)
	  .attr("fill", "none")
	  .attr("stroke", "red")
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.u); })

	    );	
	svg1.append("path")
	  .datum(cont_sim15)
	  .attr("fill", "none")
	  .attr("stroke", "red")
	  .style("stroke-dasharray", ("3, 3"))
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_2(d.u_max); })

	    );
	svg1.append("path")
	  .datum(cont_sim20)
	  .attr("fill", "none")
	  .attr("stroke", "blue")
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.u); })

	    );	
	svg1.append("path")
	  .datum(cont_sim20)
	  .attr("fill", "none")
	  .attr("stroke", "blue")
	  .style("stroke-dasharray", ("3, 3"))
	  .attr("stroke-width", 1.5)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_2(d.u_max); })
	    );


}

