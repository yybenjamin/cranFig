
// set the dimensions and margins of the graph
var margin = {top: 30, right: 40, bottom:20, left: 60},
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



var svg2= d3.select("#my_dataviz2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


var svg3= d3.select("#my_dataviz3")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


var lqr_dict=[];
var v1_dict=[];
var v2_dict=[];

var lqr_ke=[]
var lqr_ue=[];
var lqr_p=[];
var v2_ke=[];
var v2_ue=[];
var v2_p=[];
var v1_ke=[];
var v1_ue=[];
var v1_p=[];



file_lqr="https://raw.githubusercontent.com/yybenjamin/cranFig/master/energy/1R_LQR_d1rms0.0512.csv";
file_v1="https://raw.githubusercontent.com/yybenjamin/cranFig/master/energy/1R_V1d1rms0.154_p0.3723.csv";
file_v2="https://raw.githubusercontent.com/yybenjamin/cranFig/master/energy/1R_V2d1rms0.1567_p0.3501.csv";

// //read simulated and real control response data

Promise.all([
    d3.csv(file_lqr),
    d3.csv(file_v1),
    d3.csv(file_v2),

]).then(function(files) {
	
    files[0].forEach(function(d) {	
    		if(d.t<3.0)	   
				lqr_dict.push({'t':parseFloat(d.t),'d1':d.d1,'u':(parseFloat(d.u)).toString(),'u_max':parseFloat(d.u_max),'ke':parseFloat(d.K),'ue':parseFloat(d.U),'P':parseFloat(d.P)})
			//console.log(Math.log(d.P))
		});	
    files[1].forEach(function(d) {
    		if(d.t<18.0)		   
				v1_dict.push({'t':parseFloat(d.t),'d1':d.d1,'u':(parseFloat(d.u)).toString(),'u_max':parseFloat(d.u_max),'ke':parseFloat(d.K),'ue':parseFloat(d.U),'P':parseFloat(d.P)})
		});	
    files[2].forEach(function(d) {		   
			if(d.t<18.0)	 
				v2_dict.push({'t':parseFloat(d.t),'d1':d.d1,'u':(parseFloat(d.u)).toString(),'u_max':parseFloat(d.u_max),'ke':parseFloat(d.K),'ue':parseFloat(d.U),'P':parseFloat(d.P)})
		});
    plot_V1_V2_umax();
    //plot_V1_V2();
    //plot_LQR_CF_u();
	//plot_LQRenergy();
	//plot_CFenergy();
	//plot1();
	
}).catch(function(err) {
    // handle error here
})


function plot_LQRenergy(){

	var x_1 = d3.scaleLinear()
	  .domain([0,33])
	  .range([ 0, width-25 ]);
	axis_x=svg.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x_1));-
	axis_x.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');  

	// Add Y axis
	var y_1 = d3.scaleLinear()
	  .domain([-100, 1100])
	  .range([ height, 0 ]); 
	axis_lyl=svg.append("g")
	  .call(d3.axisLeft(y_1));
	axis_lyl.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');    

    var y_2 = d3.scaleLinear()
	  .domain([-20000, 10000])
	  .range([ height, 0 ]); 
	axis_ryr=svg.append("g")
	  .attr("transform", "translate(820," + 0 + ")")	
	  .call(d3.axisRight(y_2));
	axis_ryr.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');    

	
	svg.append("path")
	  .datum(lqr_dict)
	  .attr("fill", "none")
	  .attr("stroke", "green")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.ue); })
	    );
	svg.append("path")
	  .datum(lqr_dict)
	  .attr("fill", "none")
	  .attr("stroke", "blue")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.ke); })
	    );
	svg.append("path")
	  .datum(lqr_dict)
	  .attr("fill", "none")
	  .attr("stroke", "red")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_2(d.P); })
	    );  
}

function plot_CFenergy(){

	var x_1 = d3.scaleLinear()
	  .domain([0,18])
	  .range([ 0, width-25 ]);
	axis_x=svg.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x_1));-
	axis_x.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');  

	// Add Y axis
	var y_1 = d3.scaleLinear()
	  .domain([-100, 400])
	  .range([ height, 0 ]); 
	axis_lyl=svg.append("g")
	  .call(d3.axisLeft(y_1));
	axis_lyl.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');    

    var y_2 = d3.scaleLinear()
	  .domain([-10, 300])
	  .range([ height, 0 ]); 
	axis_ryr=svg.append("g")
	  .attr("transform", "translate(820," + 0 + ")")	
	  .call(d3.axisRight(y_2));
	axis_ryr.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');    
    // Add the line


	
	svg.append("path")
	  .datum(v2_dict)
	  .attr("fill", "none")
	  .attr("stroke", "green")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.ue); })
	    );
	svg.append("path")
	  .datum(v2_dict)
	  .attr("fill", "none")
	  .attr("stroke", "blue")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.ke); })
	    );
	svg.append("path")
	  .datum(v2_dict)
	  .attr("fill", "none")
	  .attr("stroke", "red")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_2(d.P); })
	    );  
}



function plot_LQR_CF_u(){

	var x_1 = d3.scaleLinear()
	  .domain([0,18])
	  .range([ 0, width-25 ]);
	axis_x=svg.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x_1));-
	axis_x.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');  

	// Add Y axis
	var y_1 = d3.scaleLinear()
	  .domain([-10, 10])
	  .range([ height, 0 ]); 
	axis_lyl=svg.append("g")
	  .call(d3.axisLeft(y_1));
	axis_lyl.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');    

    var y_2 = d3.scaleLinear()
	  .domain([-0.1, 0.1])
	  .range([ height, 0 ]); 
	axis_ryr=svg.append("g")
	  .attr("transform", "translate(820," + 0 + ")")	
	  .call(d3.axisRight(y_2));
	axis_ryr.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');    

	
	svg.append("path")
	  .datum(lqr_dict)
	  .attr("fill", "none")
	  .attr("stroke", "green")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.u); })
	    );
	svg.append("path")
	  .datum(v2_dict)
	  .attr("fill", "none")
	  .attr("stroke", "blue")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_2(d.u); })
	    );

	svg.append("path")
	  .datum(lqr_dict)
	  .attr("fill", "none")
	  .attr("stroke", "green")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.u_max); })
	    );

	svg.append("path")
	  .datum(v2_dict)
	  .attr("fill", "none")
	  .attr("stroke", "blue")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.u_max); })
	    );
	
}


function plot_V1_V2(){

	var x_1 = d3.scaleLinear()
	  .domain([0,18])
	  .range([ 0, width-25 ]);
	axis_x=svg.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x_1));-
	axis_x.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');  
	
	
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

    var y_2 = d3.scaleLinear()
	  .domain([-0.06, 1])
	  .range([ height, 0 ]); 
	// axis_ryr=svg.append("g")
	//   .attr("transform", "translate(820," + 0 + ")")	
	//   .call(d3.axisRight(y_2));
	// axis_ryr.selectAll('.tick text')
 //    .attr('font-size', 15)
 //    .attr('font-family', 'serif')
 //    .attr('fill', 'black');    

	var y_3 = d3.scaleLinear()
	  .domain([-0.18, 1])
	  .range([ height, 0 ]); 



	// var x_2 = d3.scaleLinear()
	//   .domain([9.7,11])
	//   .range([ 0, width-25 ]);
	// axis_x2=svg.append("g")
	//   .attr("transform", "translate(0," + height + ")")
	//   .call(d3.axisBottom(x_2));-
	// axis_x2.selectAll('.tick text')
 //    .attr('font-size', 15)
 //    .attr('font-family', 'serif')
 //    .attr('fill', 'black'); 
        
	// var y_4 = d3.scaleLinear()
	//   .domain([-0.1, 0.1])
	//   .range([ height, 0 ]); 
	svg.append("path")
	  .datum(v1_dict)
	  .attr("fill", "none")
	  .attr("stroke", "green")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.d1); })
	    );
	svg.append("path")
	  .datum(v2_dict)
	  .attr("fill", "none")
	  .attr("stroke", "blue")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.d1); })
	    );

	svg.append("path")
	  .datum(v1_dict)
	  .attr("fill", "none")
	  .attr("stroke", "green")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_2(d.u); })
	    );

	svg.append("path")
	  .datum(v2_dict)
	  .attr("fill", "none")
	  .attr("stroke", "blue")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_3(d.u); })
	    );

	svg.append("path")
	  .datum(v1_dict)
	  .attr("fill", "none")
	  .attr("stroke", "green")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_2(d.t); })
	    .y(function(d,i) { return y_4(d.u); })
	    );
	
}



function plot_V1_V2_umax(){

	var x_1 = d3.scaleLinear()
	  .domain([0,18])
	  .range([ 0, width-25 ]);
	axis_x=svg.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x_1));-
	axis_x.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');  
	
	
	axis_x=svg.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x_1));-
	axis_x.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black'); 
	// Add Y axis
	var y_1 = d3.scaleLinear()
	  .domain([-4, 6])
	  .range([ height, 0 ]); 
	axis_lyl=svg.append("g")
	  .call(d3.axisLeft(y_1));
	axis_lyl.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');    

 


	svg.append("path")
	  .datum(v1_dict)
	  .attr("fill", "none")
	  .attr("stroke", "green")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.u_max); })
	    );
	svg.append("path")
	  .datum(v2_dict)
	  .attr("fill", "none")
	  .attr("stroke", "blue")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_1(d.t); })
	    .y(function(d,i) { return y_1(d.u_max); })
	    );

	
}







function plot1(){

	var x_2 = d3.scaleLinear()
	  .domain([0,30])
	  .range([ 0, width ]);

	axis_x2=svg2.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x_2));

	axis_x2.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');  

	// Add Y axis
	var y_2 = d3.scaleLinear()
	  .domain([-1, 400])
	  .range([ height, 0 ]); 
	axis_lyl2=svg2.append("g")
	  .call(d3.axisLeft(y_2));
	axis_lyl2.selectAll('.tick text')
    .attr('font-size', 15)
    .attr('font-family', 'serif')
    .attr('fill', 'black');    
    // Add the line
console.log(Math.log(11))
	svg2.append("path")
	  .datum(v2_dict)
	  .attr("fill", "none")
	  .attr("stroke", "green")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_2(d.t); })
	    .y(function(d,i) { return y_2(d.ke); })
	    );
	svg2.append("path")
	  .datum(v2_dict)
	  .attr("fill", "none")
	  .attr("stroke", "orange")
	  .attr("stroke-width", 1.0)
	  .attr("d", d3.line()
	    .x(function(d,i) { return x_2(d.t); })
	    .y(function(d,i) { return y_2(d.ue); })
	    );
}

