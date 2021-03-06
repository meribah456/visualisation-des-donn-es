import axios from "axios";
import * as d3 from 'd3';
import './ConnectedScatter.css'
const ConnectedScatter=(data,xAx,yAx)=> {
// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d[xAx]); })
    .y(function(d) { return y(d[yAx]); });
    
// Adds the svg canvas
var svg = d3.select("#test3")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data

    data.forEach(function(d) {
        d[xAx] = d[xAx];
        d[yAx] = +d[yAx];
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d[xAx]; }));
    y.domain([0, d3.max(data, function(d) { return d[yAx]; })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d[xAx]); })
        .attr("cy", function(d) { return y(d[yAx]); });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);


}
export default ConnectedScatter ;