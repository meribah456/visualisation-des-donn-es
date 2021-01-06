import * as d3 from 'd3';
import './tooltip.css';
const HeatMapData=(buckets,xAx,yAx,hoverColumn)=> {
    var margin = {top: 20, right: 90, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse,
    formatDate = d3.time.format("%b %d");

var x = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    z = d3.scale.linear().range(["white", "steelblue"]);

// The size of the buckets in the CSV data file.
// This could be inferred from the data if it weren't sparse.
var xStep = 864e5,
    yStep = 100;

var svg = d3.select("#test6").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




  // Coerce the CSV data to the appropriate types.
  buckets.forEach(function(d) {
    if(parseDate(d[xAx])){
      d[xAx] = parseDate(d[xAx]);
    }else{
      d[xAx] = +d[xAx];
    }
    if(parseDate(d[yAx])){
      d[yAx] = parseDate(d[yAx]);
    }else{
      d[yAx] = +d[yAx];
    }
    d[hoverColumn] = +d[hoverColumn];
  });

  // Compute the scale domains.
  x.domain(d3.extent(buckets, function(d) { return d[xAx]; }));
  y.domain(d3.extent(buckets, function(d) { return d[yAx]; }));
  z.domain([0, d3.max(buckets, function(d) { return d[hoverColumn]; })]);

  // Extend the x- and y-domain to fit the last bucket.
  // For example, the y-bucket 3200 corresponds to values [3200, 3300].
  x.domain([x.domain()[0], +x.domain()[1] + xStep]);
  y.domain([y.domain()[0], y.domain()[1] + yStep]);

  // Display the tiles for each non-zero bucket.
  // See http://bl.ocks.org/3074470 for an alternative implementation.
  svg.selectAll(".tile")
      .data(buckets)
    .enter().append("rect")
      .attr("class", "tile")
      .attr("x", function(d) { return x(d[xAx]); })
      .attr("y", function(d) { return y(d[yAx] + yStep); })
      .attr("width", x(xStep) - x(0))
      .attr("height",  y(0) - y(yStep))
      .style("fill", function(d) { return z(d[hoverColumn]); });

  // Add a legend for the color values.
  var legend = svg.selectAll(".legend")
      .data(z.ticks(6).slice(1).reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(" + (width + 20) + "," + (20 + i * 20) + ")"; });

  legend.append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .style("fill", z);

  legend.append("text")
      .attr("x", 26)
      .attr("y", 10)
      .attr("dy", ".35em")
      .text(String);

  svg.append("text")
      .attr("class", "label")
      .attr("x", width + 20)
      .attr("y", 10)
      .attr("dy", ".35em")
      .text(hoverColumn);

  // Add an x-axis with label.
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.svg.axis().scale(x).ticks(d3.time.days).tickFormat(formatDate).orient("bottom"))
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .attr("text-anchor", "end")
      .text(xAx);

  // Add a y-axis with label.
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.svg.axis().scale(y).orient("left"))
    .append("text")
      .attr("class", "label")
      .attr("y", 6)
      .attr("dy", ".71em")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .text(yAx);


}
export default HeatMapData ;