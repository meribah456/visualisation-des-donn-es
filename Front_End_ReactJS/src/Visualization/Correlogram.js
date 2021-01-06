import axios from "axios";
import * as d3 from 'd3';
import './Correlogram.css';
const Correlogram=(datap)=> {


    var data = [];

    datap.forEach(function(d) {
      var x = d[""];
      delete d[""];
      for (var prop in d) {
        var y = prop,
          value = d[prop];
        data.push({
          x: x,
          y: y,
          value: +value
        });
      }
    });

    var margin = {
        top: 25,
        right: 80,
        bottom: 25,
        left: 25
      },
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      domain = d3.set(data.map(function(d) {
        return d.x
      })).values(),
      num = Math.sqrt(data.length),
      color = d3.scale.linear()
        .domain([-1, 0, 1])
        .range(["#B22222", "#fff", "#000080"]);

    var x = d3.scale
      .ordinal()
      .rangePoints([0, width])
      .domain(domain),
    y = d3.scale
      .ordinal()
      .rangePoints([0, height])
      .domain(domain),
    xSpace = x.range()[1] - x.range()[0],
    ySpace = y.range()[1] - y.range()[0];

    var svg = d3.select("#test2")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var cor = svg.selectAll(".cor")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "cor")
      .attr("transform", function(d) {
        return "translate(" + x(d.x) + "," + y(d.y) + ")";
      });
      
    cor.append("rect")
      .attr("width", xSpace)
      .attr("height", ySpace)
      .attr("x", -xSpace / 2)
      .attr("y", -ySpace / 2)

    cor.filter(function(d){
        var ypos = domain.indexOf(d.y);
        var xpos = domain.indexOf(d.x);
        for (var i = (ypos + 1); i < num; i++){
          if (i === xpos) return false;
        }
        return true;
      })
      .append("text")
      .attr("y", 5)
      .text(function(d) {
        if (d.x === d.y) {
          return d.x;
        } else {
          return d.value.toFixed(2);
        }
      })
      .style("fill", function(d){
        if (d.value === 1) {
          return "#000";
        } else {
          return color(d.value);
        }
      });

      cor.filter(function(d){
        var ypos = domain.indexOf(d.y);
        var xpos = domain.indexOf(d.x);
        for (var i = (ypos + 1); i < num; i++){
          if (i === xpos) return true;
        }
        return false;
      })
      .append("circle")
      .attr("r", (width / (num * 2) - 5))
      .style("fill", function(d){
        if (d.value === 1) {
          return "#000";
        } else {
          return color(d.value);
        }
      });
      
  var aS = d3.scale
    .linear()
    .range([-margin.top + 5, height + margin.bottom - 5])
    .domain([1, -1]);

  var yA = d3.svg.axis()
    .orient("right")
    .scale(aS)
    .tickPadding(7);

  var aG = svg.append("g")
    .attr("class", "y axis")
    .call(yA)
    .attr("transform", "translate(" + (width + margin.right / 2) + " ,0)")

  var iR = d3.range(-1, 1.01, 0.01);
  var h = height / iR.length + 3;
  iR.forEach(function(d){
      aG.append('rect')
        .style('fill',color(d))
        .style('stroke-width', 0)
        .style('stoke', 'none')
        .attr('height', h)
        .attr('width', 10)
        .attr('x', 0)
        .attr('y', aS(d))
    });
    
}
export default Correlogram ;