fetch("routes.json")
  .then((response) => response.json())
  .then((routes) => {
    // Initialiser la carte Leaflet
    var map = L.map("map").setView([47.2184, -1.5536], 13);

    // Ajouter une couche de tuiles OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Données de ligne exemple (relier chaque point au suivant)

    routes.forEach((route) => {});

    var lineData = routes[0].edges;

    createLine(lineData, "red");
    var stops = [];
    lineData.forEach(function (link) {
      console.log(link.source);
      stops.push(link.source);
      //stops[link.source.stop_id] = link.source;
      //stops[link.target.stop_id] = link.target;
    });
    //var uniqueStops = Object.values(stops);

    //console.log(stops);

    // Fonction pour mettre à jour les positions des cercles
    // Fonction pour mettre à jour les positions des lignes et des cercles
    function update() {
      // Mettre à jour les lignes
      g.selectAll("line")
        .data(lineData[0].edges)
        .attr("x1", function (d) {
          return map.latLngToLayerPoint([
            d.source.stop_lat,
            d.source.stop_lon,
          ]).x;
        })
        .attr("y1", function (d) {
          return map.latLngToLayerPoint([
            d.source.stop_lat,
            d.source.stop_lon,
          ]).y;
        })
        .attr("x2", function (d) {
          return map.latLngToLayerPoint([
            d.target.stop_lat,
            d.target.stop_lon,
          ]).x;
        })
        .attr("y2", function (d) {
          return map.latLngToLayerPoint([
            d.target.stop_lat,
            d.target.stop_lon,
          ]).y;
        });

      // Mettre à jour les cercles
      d3.selectAll("circle")
        .attr("cx", function (d) {
          return map.latLngToLayerPoint([d.stop_lat, d.stop_lon]).x;
        })
        .attr("cy", function (d) {
          return map.latLngToLayerPoint([d.stop_lat, d.stop_lon]).y;
        });
    }

    // Créer un calque SVG pour D3 dans la carte Leaflet
    var svgLayer = L.svg({ clickable: true }).addTo(map);
    var svg = d3.select("#map").select("svg");
    var g = svg.append("g");

    // Ajouter des cercles pour chaque point de données

    // Ajouter des lignes pour chaque paire de points
    function createLine(line, color) {
      console.log("line", line);
      g.selectAll("line")
        .data(line)
        .enter()
        .append("line")
        .style("stroke", color) // Couleur des lignes
        .style("stroke-width", 3); // Épaisseur des lignes
    }

    function createStop(data, color) {
      g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .style("fill", "blue")
        .attr("r", 6)
        .attr("stroke", "white")
        .attr("stroke-width", 3)
        .attr("fill-opacity", 0.5)
        .on("mouseover", function (event, d) {
          // Vous pouvez ajouter des interactions ici, comme afficher des infobulles
          alert("Vous avez survolé " + d.name);
        });
    }

    // Assurez-vous que les points sont correctement positionnés lorsque la carte est déplacée ou zoomée
    map.on("moveend", update);
    update(); // Mise à jour initiale des positions
  });
