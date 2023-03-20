function createSoccerViz() {
    d3.csv("https://raw.githubusercontent.com/beewhoo/d3/master/worldcup.csv?token=GHSAT0AAAAAAB7OMKPDOX2YWKV6OUJDMQEKZATZTAA", function(data) {
        overallTeamViz(data);
    })

    function overallTeamViz(incomingData) {
        d3.select("svg")
            .append("g")
            .attr("id", "teamsG")
            .attr("transform", "translate(50,300)")
            .selectAll("g")
            .data(incomingData)
            .enter()
            .append("g")
            .attr("class", "overallG")
            .attr("transform",
                function(d, i) {
                    return "translate(" + (i * 50) + ", 0)"
                }
            );
        var teamG = d3.selectAll("g.overallG");

        teamG
            .append("circle")
            .attr("r", 0)
            .transition()
            .delay(function(d,i) { return i * 100})
            .duration(500)
            .attr("r", 20)
            .transition()
            .duration(500)
            .attr("r", 20)
            .style("fill", "pink")
            .style("stroke", "black")
            .style("stroke-width", "1px");
        teamG
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", 30)
            .style("font-size", "10px")
            .text(function(d) {
                return d.team;
            });

        d3.selectAll("g.overallG").insert("image")
          .attr("xlink:href", function(d) {
              return "images/" + d.team+ ".png";
          })
          .attr("width", "45px").attr("height", "14px").attr("x", "-22")
          .attr("y", "-10");




        var dataKeys = d3.keys(incomingData[0]).filter(function(el) {
            return el != "team" && el != "region";
        });


        d3.select("#controls").selectAll("button.teams")
            .data(dataKeys).enter()
            .append("button")
            .on("click", buttonClick)
            .html(function(d) {
                return d;
            });
            

        function buttonClick(datapoint) {
            var maxValue = d3.max(incomingData, function(d) {
                return parseFloat(d[datapoint]);
            });

            var radiusScale = d3.scale.linear()
                .domain([0, maxValue])
                .range([2, 20]);

            d3.selectAll("g.overallG").select("circle").attr("r", function(d) {
                return radiusScale(d[datapoint]);
            });
        };





        teamG.on("mouseover", highlightRegion);

        function highlightRegion(mouseOverSelected) {
            d3.selectAll("g.overallG").select("circle").style("fill", function(country) {

                if (country.region === mouseOverSelected.region) {
                    return "red";
                } else {
                    return "gray";
                }
            });
            
        };

    }
}
