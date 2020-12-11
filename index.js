var svg = d3.select("svg"),
  width = $(document).width(),
  height = $(document).height(),
  height = 1000,
  margin = { top: 20, bottom: 20, right: 20, left: 0 },
  centered,
  fmt = d3.format(".5"),
  errorCount = 0;

svg.attr("width", width).attr("height", height);

function ready(error, us, data) {
  //if (error) throw error;
  var dictCities = {};
  data.forEach(function(d) {
    d.result = d["cases"];
    console.log(d);
    dictCities[d.combined_fips] = d;
  });
  //var color = d3.scaleLinear()
  //  .domain([0, 400, 800, 1600, 2400, 3200, 4000, 4800, 5600])
  //  .range(["white", "red"]);

  var color = d3.scaleSequential(d3.interpolateOranges)
      .domain([0,2000]);

  svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);

  svg.on("click", clicked);

  svg.append("g")
      .attr("class", "legend")
      .attr("transform",
          width > 767 ?
              "translate(" + (width - margin.right - 150) + ",100)" :
              "translate(" + (width / 2 - 100) + "," + (height - 120) + ")"
      );

  var legendLinear = d3.legendColor()
      // .shapeWidth(30)
      .title("Cases")
      .cells(11)
      // .labels([
      //     " 100.00% Dem",
      //     "  66.67%",
      //     "  33.33%",
      //     "   0.00%",
      //     "  33.33%",
      //     "  66.67%",
      //     " 100.00% Rep",
      // ].reverse())
      .labelFormat(fmt)
      .ascending(true)
      .labelAlign("end")
      .scale(color);

  svg.select(".legend")
      .call(legendLinear);

  var zoom = d3.zoom()
    .scaleExtent([1, 15])
    .on("zoom", zoomed);

  svg.style("pointer-events", "all").call(zoom);
  var g = svg.append("g");

  function zoomed() {
    console.log(d3.event.transform);
    g.attr("transform", d3.event.transform);
  }

  var projection = d3
    .geoAlbersUsa()
    .scale(width)
    .translate([width / 2, height / 2]);

  var path = d3.geoPath().projection(projection);

  g.selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .enter()
    .append("path")
    .attr("class", "tract")
    .on("click", clicked)
    .style("fill", function(d) {
      var city = dictCities[d.id];
      if (city) return color(city.result);
      else {
        errorCount++;
        //console.log(d.id + " Not found" + " errors = " + errorCount);
        return color(0);
      }
    })
    .attr("d", path)
    .append("title")
    .text(function(d) {
      var city = dictCities[d.id],
        county,
        state;

      // var msg = d.id;
      if (city) {
        county = city.county_name;
        state = city.state_abbr;
        var msg = county + ", " + state + " " + fmt(city.result);
      }
      return msg;
    });

  g.append("path")
    .datum(
      topojson.mesh(us, us.objects.states, function(a, b) {
        return a !== b;
      })
    )
    .attr("class", "tract-border-state")
    .attr("d", path);

  // When clicked, zoom in
  function clicked(d) {
    var x, y, k;

    // Compute centroid of the selected path
    if (d && centered !== d) {
      // if (d) {
      var centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      // k = zoom.scaleExtent()[1];
      k = 10;
      centered = d;
    } else {
      x = width / 2;
      y = height / 2;
      k = 1;
      centered = null;
    }

    // Manually Zoom
    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(k)
          .translate(-x, -y)
      );
  }
}

// Load multiple files at once
d3.queue()
  .defer(
    d3.json,
    "https://cdn.rawgit.com/john-guerra/US_Elections_Results/master/us.json"
  )
  .defer(
    d3.csv,
    "https://raw.githubusercontent.com/biolchen/dataScience/master/data/us_covid19.csv"
  )
  .await(ready);
