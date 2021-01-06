import * as d3 from 'd3';
import './Density2D.css';
const Density2D=()=> {
// http://blog.thomsonreuters.com/index.php/mobile-patent-suits-graphic-of-the-day/
var links = [
  {source: "Microsoft", target: "Amazon", type: "licensing"},
  {source: "Microsoft", target: "HTC", type: "licensing"},
  {source: "Samsung", target: "Apple", type: "suit"},
  {source: "Motorola", target: "Apple", type: "suit"},
  {source: "Nokia", target: "Apple", type: "resolved"},
  {source: "HTC", target: "Apple", type: "suit"},
  {source: "Kodak", target: "Apple", type: "suit"},
  {source: "Microsoft", target: "Barnes & Noble", type: "suit"},
  {source: "Microsoft", target: "Foxconn", type: "suit"},
  {source: "Oracle", target: "Google", type: "suit"},
  {source: "Apple", target: "HTC", type: "suit"},
  {source: "Microsoft", target: "Inventec", type: "suit"},
  {source: "Samsung", target: "Kodak", type: "resolved"},
  {source: "LG", target: "Kodak", type: "resolved"},
  {source: "RIM", target: "Kodak", type: "suit"},
  {source: "Sony", target: "LG", type: "suit"},
  {source: "Kodak", target: "LG", type: "resolved"},
  {source: "Apple", target: "Nokia", type: "resolved"},
  {source: "Qualcomm", target: "Nokia", type: "resolved"},
  {source: "Apple", target: "Motorola", type: "suit"},
  {source: "Microsoft", target: "Motorola", type: "suit"},
  {source: "Motorola", target: "Microsoft", type: "suit"},
  {source: "Huawei", target: "ZTE", type: "suit"},
  {source: "Ericsson", target: "ZTE", type: "suit"},
  {source: "Kodak", target: "Samsung", type: "resolved"},
  {source: "Apple", target: "Samsung", type: "suit"},
  {source: "Kodak", target: "RIM", type: "suit"},
  {source: "Nokia", target: "Qualcomm", type: "suit"}
];

var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

nodes = d3.values(nodes);

var width = 600;
var height = 450;
var scale = 0.3;

var gridSize = 10;

var xyPoints = [];
var h, h2, iqr, xPoints;

// Array of grid cell points. Each point is the center of the grid cell.
var grid = d3.merge(d3.range(0, height/gridSize).map(function(i) {
  return d3.range(0, width/gridSize).map(function(j) { return [j*gridSize + gridSize/2, i*gridSize + gridSize/2] });
}));

// Density at each (x,y) coordinate in the grid
var densities = [];

var outerScale = d3.scale.pow()
    .exponent(0.4)
    .domain([0,1])
    .range([0,1]);
var heatmapColor = d3.scale.linear()
    .clamp(true)
    .domain([0, 0.1111111111111111, 0.2222222222222222, 0.3333333333333333, 0.4444444444444444, 0.5555555555555555, 0.6666666666666666, 0.7777777777777777, 0.8888888888888888, 1])
    .range(['#ffffff','#fff7f3','#fde0dd','#fcc5c0','#fa9fb5',
      '#f768a1','#dd3497','#ae017e','#7a0177','#49006a']);

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

var canvas = d3.select("#test4").append("canvas")
    .attr("width", width)
    .attr("height", height);

var svg = d3.select("#test4").append("svg")
    .attr("width", scale * width)
    .attr("height", scale * height)
    .append("g")
    .attr("transform", "scale(" + scale + ", " + scale + ")");

var context = canvas.node().getContext("2d");

force
    .nodes(nodes)
    .links(links)
    .start();

var link = svg.selectAll(".link")
    .data(links)
  .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function(d) { return Math.sqrt(d.value); });

var node = svg.selectAll(".node")
    .data(nodes)
  .enter().append("circle")
    .attr("class", "node")
    .attr("r", 8)
    .style("fill", "#1f77b4");

node.append("title")
    .text(function(d) { return d.name; });

force.on("tick", function(event) {
  // Not many changes after this point
  if (event.alpha < 0.04) force.stop();

  link.attr("x1", function(d) { d.source.x = boundedCoords(d.source.x, width); return d.source.x; })
      .attr("y1", function(d) { d.source.y = boundedCoords(d.source.y, height); return d.source.y; })
      .attr("x2", function(d) { d.target.x = boundedCoords(d.target.x, width); return d.target.x; })
      .attr("y2", function(d) { d.target.y = boundedCoords(d.target.y, height); return d.target.y; });

  node.attr("cx", function(d) { d.x = boundedCoords(d.x, width); return d.x; })
      .attr("cy", function(d) { d.y = boundedCoords(d.y, height); return d.y; });

  // Track new node positions
  node.each(function(d) {
    xyPoints.push([d.x,d.y]);
  });

  // Update bandwidth
  // Use same bandwidth for each dimension
  xPoints = xyPoints.map(function(d) { return d[0] }).sort(function(a,b) { return a - b });
  iqr = d3.quantile(xPoints, 0.75) - d3.quantile(xPoints, 0.25);
  h = 1.06 * Math.min(d3.deviation(xPoints), iqr / 1.34) * Math.pow(xyPoints.length, -0.2);
  h2 = h*h;

  // Compute KDE for each (x,y) pair and update the color scale
  densities = grid.map(function(point) { return kde(point); });
  outerScale.domain([0, d3.max(densities)]);

  // Draw the grid
  grid.forEach(function(point, idx) {
    context.beginPath();
    context.fillStyle = heatmapColor(outerScale(densities[idx]));
    // Subtract to get the corner of the grid cell
    context.rect(point[0] - gridSize/2, point[1] - gridSize/2, gridSize, gridSize);
    context.fill();
    context.closePath();
  });
});

function boundedCoords(pos, maxPos) {
  return Math.min(maxPos, Math.max(0, pos));
}

// Use same bandwidth for each dimension
function kde(gridPoint) {
  return d3.mean(xyPoints, function(p) { return gaussian(norm(p, gridPoint) / h) }) / h2;
}

// Norm of 2D arrays/vectors
function norm(v1, v2) {
  return Math.sqrt((v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]));
}

function gaussian(x) {
  // sqrt(2 * PI) is approximately 2.5066
  return Math.exp(-x * x / 2) / 2.5066;
}

}
export default Density2D ;