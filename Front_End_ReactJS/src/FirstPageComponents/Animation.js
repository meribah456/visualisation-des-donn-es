import * as d3 from 'd3';
const Animation=()=>{
                            var width = 950,
                            height = 300;

                            var nodes = d3.range(200).map(function() { return {radius: Math.random() * 5 };}),
                            root = nodes[0],
                            color = d3.scale.category10();

                            root.radius = 0;
                            root.fixed = true;

                            var force = d3.layout.force()
                            .gravity(0.05)
                            .charge(function(d, i) { return i ? 0 : -2000; })
                            .nodes(nodes)
                            .size([width, height]);

                        force.start();

                        var svg = d3.select("#animation").append("svg")
                            .attr("width", width)
                            .attr("height", height)
                            .style("opacity","0.7");

                        svg.selectAll("circle")
                            .data(nodes.slice(1))
                        .enter().append("circle")
                            .attr("r", function(d) { return d.radius; })
                            .style("fill", function(d, i) { return color(i % 2); });

                        force.on("tick", function(e) {
                        var q = d3.geom.quadtree(nodes),
                            i = 0,
                            n = nodes.length;

                        while (++i < n) q.visit(collide(nodes[i]));

                        svg.selectAll("circle")
                            .attr("cx", function(d) { return d.x; })
                            .attr("cy", function(d) { return d.y; });
                        });

                        svg.on("mousemove", function() {
                        var p1 = d3.mouse(this);
                        root.px = p1[0];
                        root.py = p1[1];
                        force.resume();
                        });

                        function collide(node) {
                        var r = node.radius + 16,
                            nx1 = node.x +4 ,
                            nx2 = node.x+4,
                            ny1 = node.y +4,
                            ny2 = node.y +4;
                        return function(quad, x1, y1, x2, y2) {
                            if (quad.point && (quad.point !== node)) {
                            var x = node.x - quad.point.x,
                                y = node.y - quad.point.y,
                                l = Math.sqrt(x * x + y * y),
                                r = node.radius + quad.point.radius;
                            if (l < r) {
                                l = (l - r) / l * .9;
                                node.x -= x *= l;
                                node.y -= y *= l;
                                quad.point.x += x;
                                quad.point.y += y;
                            }
                            }
                            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                        };
                        }
      }
export default Animation ;