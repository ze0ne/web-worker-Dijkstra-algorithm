// Initialiser la carte Leaflet
console.log("leaflet", L);
var map = L.map("map").setView([47.2184, -1.5536], 13);

// Ajouter une couche de tuiles OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Créer un calque SVG pour D3 dans la carte Leaflet
var svgLayer = L.svg({ clickable: true }).addTo(map);
var svg = d3.select("#map").select("svg");
var g = svg.append("g");

var tooltip = d3.select("body").append("div").attr("class", "tooltip");

fetch("routes.json")
  .then((response) => response.json())
  .then((routes) => {
    console.log("routes", routes);
    // Données de ligne exemple (relier chaque point au suivant)

    routes.forEach((route) => {
      //console.log("route", route);
      const lineData = route.edges.map((edge) => {
        return {
          source: {
            lat: edge.source.stop_lat,
            lon: edge.source.stop_lon,
            name: edge.source.stop_name,
          },
          target: {
            lat: edge.target.stop_lat,
            lon: edge.target.stop_lon,
            name: edge.target.stop_name,
          },
        };
      });
      const stopsData = route.stops.map((stop) => {
        return {
          lat: stop.stop_lat,
          lon: stop.stop_lon,
          name: stop.stop_name,
        };
      });
      createLine({ ...route, edges: lineData, stops: stopsData }, g);
      createStopPoint({ ...route, edges: lineData, stops: stopsData }, g);
    });

    // const lineData = line1.edges.map((edge) => {
    //   return {
    //     source: {
    //       lat: edge.source.stop_lat,
    //       lon: edge.source.stop_lon,
    //       name: edge.source.stop_name,
    //     },
    //     target: {
    //       lat: edge.target.stop_lat,
    //       lon: edge.target.stop_lon,
    //       name: edge.target.name,
    //     },
    //   };
    // });

    // Fonction pour mettre à jour les positions des cercles
    // Fonction pour mettre à jour les positions des lignes et des cercles

    //createStopPoint(line1, g);
    //createStopPoint(line2, g);

    // Ajouter des lignes pour chaque paire de points
    // g.selectAll("line")
    //   .data(lineData)
    //   .enter()
    //   .append("line")
    //   .style("stroke", `#${line1.route.route_color}`) // Couleur des lignes
    //   .style("stroke-width", 3); // Épaisseur des lignes

    // Assurez-vous que les points sont correctement positionnés lorsque la carte est déplacée ou zoomée
    // map.on("moveend", updateMap);
    //updateMap(g, lineData); // Mise à jour initiale des positions
  });

function createStopPoint(line, g) {
  const className = `route_${line.route.route_short_name}`;
  g.selectAll(`circle.${className}`)
    .data(line.stops)
    .enter()
    .append("circle")
    .style("fill", `#${line.route.route_color}`)
    .style("z-index", "0")
    .on("mouseover", function (event, d) {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip.html(d.name).style("border-color", `#${line.route.route_color}`);

      const xPosition = event.pageX - tooltip.node().offsetWidth / 2;

      tooltip
        .style("left", xPosition + "px")
        .style("top", event.pageY - 40 + "px");

      console.log("width", tooltip.node().offsetWidth);
    })
    // .on("mouseout", function (d) {
    //   tooltip.transition().duration(500).style("opacity", 0);
    // })
    .attr("class", className)
    .attr("r", 6)
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("fill-opacity", 1);

  updateMap(g, line); // Mise à jour initiale des positions
}

function createLine(line, g) {
  const className = `route_${line.route.route_short_name}`;
  g.selectAll(`line.${className}`)
    .data(line.edges)
    .enter()
    .append("line")
    .attr("class", className)
    .style("stroke", `#${line.route.route_color}`) // Couleur des lignes
    .attr("class", className)
    .style("stroke-width", 3); // Épaisseur des lignes

  updateMap(g, line);
}

function updateMap(g, line) {
  const className = `route_${line.route.route_short_name}`;
  // Mettre à jour les lignes
  g.selectAll(`line.${className}`)
    .data(line.edges)
    .attr("x1", function (d) {
      return map.latLngToLayerPoint([d.source.lat, d.source.lon]).x;
    })
    .attr("y1", function (d) {
      return map.latLngToLayerPoint([d.source.lat, d.source.lon]).y;
    })
    .attr("x2", function (d) {
      return map.latLngToLayerPoint([d.target.lat, d.target.lon]).x;
    })
    .attr("y2", function (d) {
      return map.latLngToLayerPoint([d.target.lat, d.target.lon]).y;
    });

  // Mettre à jour les cercles
  d3.selectAll(`circle.${className}`)
    .attr("cx", function (d) {
      return map.latLngToLayerPoint([d.lat, d.lon]).x;
    })
    .attr("cy", function (d) {
      return map.latLngToLayerPoint([d.lat, d.lon]).y;
    });
}
