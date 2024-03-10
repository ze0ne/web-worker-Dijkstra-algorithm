// Initialiser la carte Leaflet
console.log("leaflet", L);
var map = L.map("map").setView([47.2184, -1.5536], 14);

// Ajouter une couche de tuiles OpenStreetMap
L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Créer un calque SVG pour D3 dans la carte Leaflet
var svgLayer = L.svg({ clickable: true }).addTo(map);
var svg = d3.select("#map").select("svg");
var g = svg.append("g");

var tooltip = d3.select("body").append("div").attr("class", "tooltip");

// Exemple de tableau de lignes de transports et d'arrêts
const tableauTransport = [];

// Création du graphe
let graphe = {};

// Exécution de l'algorithme de Dijkstra
const depart = "Tourmaline";
const destination = "Commerce";
const { cheminPlusCourt, dureeTotale } = dijkstra(graphe, depart, destination); // fonction à définir

console.log(
  `Le chemin le plus court de ${depart} à ${destination} est :`,
  cheminPlusCourt
);
console.log("La durée totale du trajet est :", dureeTotale);

// Fonction pour calculer le temps de trajet entre deux arrêts (à définir selon votre logique)
function calculerTempsTrajet(depart, arrivee) {
  // Implémentez votre propre logique pour calculer le temps de trajet
  return Math.random() * 60; // Temps de trajet aléatoire entre 0 et 60 minutes
}

// Fonction pour ajouter une arête au graphe (à définir)
function ajouterArete(graphe, depart, arrivee, poids) {
  if (!graphe[depart]) {
    graphe[depart] = [];
  }
  graphe[depart].push({ arrivee, poids });
}

// Fonction pour exécuter l'algorithme de Dijkstra (à définir)
function dijkstra(graphe, depart, destination) {
  // Création d'un objet pour stocker les distances depuis le nœud de départ
  const distances = {};
  // Création d'un objet pour stocker les chemins les plus courts depuis le nœud de départ
  const chemins = {};
  // Initialisation des distances pour tous les nœuds à l'infini sauf pour le nœud de départ à 0
  for (const noeud in graphe) {
    distances[noeud] = noeud === depart ? 0 : Infinity;
    chemins[noeud] = null;
  }

  const nœudsNonVisités = new Set(Object.keys(graphe));

  while (nœudsNonVisités.size > 0) {
    // Trouver le nœud non visité avec la plus petite distance connue
    const noeudActuel = Array.from(nœudsNonVisités).reduce((minNoeud, noeud) =>
      distances[noeud] < distances[minNoeud] ? noeud : minNoeud
    );

    // Si le nœud actuel est le nœud de destination, on a trouvé le chemin le plus court
    if (noeudActuel === destination) {
      break;
    }

    // Retirer le nœud actuel de l'ensemble des nœuds non visités
    nœudsNonVisités.delete(noeudActuel);

    // Pour chaque nœud voisin du nœud actuel
    for (const voisin of graphe[noeudActuel]) {
      const distanceAlternative = distances[noeudActuel] + voisin.poids;
      // Si la distance alternative est plus courte que la distance actuellement connue pour ce voisin
      if (distanceAlternative < distances[voisin.arrivee]) {
        // Mettre à jour la distance et le chemin pour ce voisin
        distances[voisin.arrivee] = distanceAlternative;
        chemins[voisin.arrivee] = noeudActuel;
      }
    }
  }

  // Reconstruire le chemin le plus court à partir des chemins trouvés
  const cheminPlusCourt = [destination];
  let noeud = destination;
  while (noeud !== depart) {
    noeud = chemins[noeud];
    cheminPlusCourt.unshift(noeud);
  }

  // Retourner le chemin le plus court et la durée totale du trajet
  return { cheminPlusCourt, dureeTotale: distances[destination] };
}

fetch("routes.json")
  .then((response) => response.json())
  .then((routes) => {
    //console.log("routes", routes);

    // Données de ligne exemple (relier chaque point au suivant)

    routes.forEach((route) => {
      const stops = [];
      route.stops.forEach((stop) => {
        stops.push(stop.stop_name);
      });
      const toto = { ligne: route.route.route_id, arrets: stops };
      //console.log("toto", toto);
      tableauTransport.push(toto);
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
    map.on("moveend", updateAll(routes));

    // Remplissage du graphe
    tableauTransport.forEach((ligne) => {
      //console.log("ligne", ligne);
      for (let i = 0; i < ligne.arrets.length - 1; i++) {
        const depart = ligne.arrets[i];
        const arrivee = ligne.arrets[i + 1];
        const tempsTrajet = calculerTempsTrajet(depart, arrivee); // fonction à définir
        ajouterArete(graphe, depart, arrivee, tempsTrajet); // fonction à définir
      }
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
      tooltip.transition().duration(200).style("opacity", 1);
      tooltip.html(d.name).style("border-color", `#${line.route.route_color}`);

      const xPosition = event.pageX - tooltip.node().offsetWidth / 2;

      tooltip
        .style("left", xPosition + "px")
        .style("top", event.pageY - 40 + "px");
    })
    // .on("mouseout", function (d) {
    //   tooltip.transition().duration(500).style("opacity", 0);
    // })
    .attr("class", className)
    .attr("r", 4)
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

function updateAll(routes) {
  routes.forEach((route) => {
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
    const line = { ...route, edges: lineData, stops: stopsData };

    updateMap(g, line);
  });
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
