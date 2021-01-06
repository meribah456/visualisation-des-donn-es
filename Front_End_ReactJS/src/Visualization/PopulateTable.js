import * as d3 from 'd3';
import './tooltip.css';
const PopulateTable=(data,columns)=>{
            var myDivTable=d3.select("#myDivTable").classed("overflow-auto",true)
            myDivTable.style("height","500px")
            myDivTable.style("width","99%").style("margin-left","5px")
            myDivTable.style("font-size","10px")
            var myhead=d3.select("#myhead")
            var mybody=d3.select("#mybody")
            var table = d3.select("#myTable").classed("table table-hover overflow-auto table-striped",true)
            var thead = myhead.classed("table-primary overflow-auto",true)
            var tbody = mybody.classed("bg-light",true);
            var div = d3.select("body").append("div") 
                      .attr("class", "tooltip")
                      .style("opacity", 0);



          thead.append("tr")
            .selectAll("th")
              .data(columns)
              .enter()
            .append("th")
              .text(function (d) { return d })

          var rows = tbody.selectAll('tr')
              .data(data)
              .enter()
            .append('tr').classed("dark-mode-text-hover",true)
            

          var cells = rows.selectAll('td')
              .data(function(row) {
                return columns.map(function (column) {
                  return { column: column, value: row[column] }
                })
              })
              .enter()
            .append('td')
              .text(function (d) { return d.value })
              .on("mouseover", function (d){
                      div.transition()    
                      .duration(200)    
                      .style("opacity", .9);    
                      div.html("Column :" + "</br>" + d.column)  
                      .style("left",(d3.event.pageX) + "px")   
                      .style("top",(d3.event.pageY) + "px");
          
                })
              .on("mouseout", function(d) {    
                    div.transition()    
                    .duration(500)    
                    .style("opacity", 0); 
              });
              return table;
      }
export default PopulateTable ;