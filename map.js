// Initialiser la carte Leaflet
console.log("leaflet", L);
var graphzzzz = {
  a: { b: 10, d: 1 },
  b: { a: 1, c: 1, e: 1 },
  c: { b: 1, f: 1 },
  d: { a: 1, e: 1, g: 1 },
  e: { b: 1, d: 1, f: 1, h: 1 },
  f: { c: 1, e: 1, i: 1 },
  g: { d: 1, h: 1 },
  h: { e: 1, g: 1, i: 1 },
  i: { f: 1, h: 1 },
};

console.log("cc", graphzzzz);
var map = L.map("map").setView([47.2184, -1.5536], 13);

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
const depart = "Jean Rostand";
const destination = "Commerce";

// console.log(
//   `Le chemin le plus court de ${depart} à ${destination} est :`,
//   cheminPlusCourt
// );
// console.log("La durée totale du trajet est :", dureeTotale);

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
  //console.log("graph", graphe);
}

//const { cheminPlusCourt, dureeTotale } = dijkstra(graphe, depart, destination); // fonction à définir

// Fonction pour exécuter l'algorithme de Dijkstra (à définir)

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

    console.log("tableau", tableauTransport);

    // Remplissage du graphe
    tableauTransport.forEach((ligne) => {
      //console.log("ligne", ligne);
      for (let i = 0; i < ligne.arrets.length - 1; i++) {
        const depart = ligne.arrets[i];
        const arrivee = ligne.arrets[i + 1];
        const tempsTrajet = calculerTempsTrajet(depart, arrivee); // fonction à définir
        //console.log("tempsTrajet", depart, arrivee, tempsTrajet);
        ajouterArete(graphe, depart, arrivee, tempsTrajet); // fonction à définir
      }
    });

    // const simpleGraph = {};

    // tableauTransport.forEach((line) => {
    //   const time = Math.round(Math.random() * 60);
    //   simpleGraph[line.ligne] = line.arrets.reduce((acc, stop) => {
    //     acc[stop] = time;
    //     return acc;
    //   }, {});
    // });

    // // Afficher le graphe
    // console.log("simpleGraph", simpleGraph);

    // Création du graphe

    // Définir une fonction pour créer le graphe à partir des données des lignes de bus
    function créerGraphe(lignes) {
      const graphezz = {};

      // Parcourir chaque ligne
      lignes.forEach((ligne) => {
        const arrets = ligne.arrets;
        const ligneId = ligne.ligne;

        // Parcourir chaque arrêt de la ligne
        for (let i = 0; i < arrets.length - 1; i++) {
          const départ = arrets[i];
          const arrivée = arrets[i + 1];

          // Ajouter les connexions dans les deux sens
          if (!graphezz[départ]) {
            graphezz[départ] = {};
          }
          if (!graphezz[arrivée]) {
            graphezz[arrivée] = {};
          }
          graphezz[départ][arrivée] = 1; // Poids arbitraire de 1 pour chaque connexion
          graphezz[arrivée][départ] = 1;
        }
      });

      return graphezz;
    }

    const graphik = créerGraphe(tableauTransport);
    console.log("phik", graphik);

    const start = "Polyclinique";
    const end = "Hangar à Bananes";
    focusStop(start);
    focusStop(end);

    //console.log("eephrah", graphe, depart, destination);
    function dijkstrazz(noeuds, depart, arrivee) {
      focusStop(depart, "start");
      focusStop(arrivee, "end");
      // Initialisation des distances et des prédécesseurs
      let distances = {};
      let predecesseurs = {};
      let noeudsNonVisites = Object.keys(noeuds);

      // Initialisation des distances à l'infini sauf pour le noeud de départ
      for (let noeud of noeudsNonVisites) {
        distances[noeud] = Infinity;
      }
      distances[depart] = 0;

      // Boucle principale jusqu'à ce que tous les noeuds soient visités
      while (noeudsNonVisites.length) {
        // Sélection du noeud non visité avec la plus petite distance actuelle
        let noeudActuel = noeudsNonVisites.reduce(
          (min, noeud) => (distances[noeud] < distances[min] ? noeud : min),
          noeudsNonVisites[0]
        );

        // Retrait du noeud actuel de la liste des noeuds non visités
        noeudsNonVisites = noeudsNonVisites.filter(
          (noeud) => noeud !== noeudActuel
        );

        // Mise à jour des distances et des prédécesseurs pour les voisins du noeud actuel
        for (let voisin of noeuds[noeudActuel]) {
          let distance = distances[noeudActuel] + voisin.poids;
          if (distance < distances[voisin.arrivee]) {
            distances[voisin.arrivee] = distance;
            predecesseurs[voisin.arrivee] = noeudActuel;
          }
        }
      }

      // Reconstruction du chemin le plus court
      let cheminCourt = [arrivee];
      let predecesseur = arrivee;
      while (predecesseur !== depart) {
        cheminCourt.unshift(predecesseurs[predecesseur]);
        predecesseur = predecesseurs[predecesseur];
      }

      // Retourne le chemin le plus court
      return cheminCourt;
    }

    //const result = dijkstrazz(graphe, "Commerce", "Mangin");
    //console.log("result", result);

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
    .attr("class", (d, i) => `${className} stop_${formaterChaine(d.name)}`)
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
    //.attr("class", className)
    .attr("r", 4)
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("fill-opacity", 1);

  updateMap(g, line); // Mise à jour initiale des positions
}

function focusStop(stop, className) {
  ///console.log("focusStop", stop, className);
  g.selectAll(`circle.stop_${formaterChaine(stop)}`)
    .attr("r", 6)
    .attr("class", (d, i) => `${className} stop_${formaterChaine(d.name)}`);
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

function formaterChaine(chaine) {
  // Remplacer les caractères spéciaux par des tirets
  var chaineFormatee = chaine.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
  return chaineFormatee;
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

// Implémentation de l'algorithme de Dijkstra
function dijkstra(graphe, départ, callback) {
  const distances = {};
  const visited = {};
  const parents = {};
  const queue = [];

  // Initialisation des distances et des parents
  for (let sommet in graphe) {
    distances[sommet] = Infinity;
    parents[sommet] = null;
  }
  distances[départ] = 0;

  // Ajouter le nœud de départ à la file d'attente
  queue.push(départ);

  // Tant que la file d'attente n'est pas vide
  const traverseQueue = () => {
    if (queue.length > 0) {
      // Retirer le nœud avec la plus petite distance de la file d'attente
      const courant = queue.shift();
      focusStop(courant, "active");
      visited[courant] = true;

      // Parcourir les voisins du nœud courant
      for (let voisin in graphe[courant]) {
        if (!visited[voisin]) {
          const poids = graphe[courant][voisin];
          const distance = distances[courant] + poids;

          // Mettre à jour la distance et le parent si la nouvelle distance est plus courte
          if (distance < distances[voisin]) {
            distances[voisin] = distance;
            parents[voisin] = courant;
            queue.push(voisin);
          } else {
            focusStop(voisin, "off");
          }
        }
      }
      // Appel de la fonction de rappel une fois que Dijkstra est terminé
      callback({ distances, parents });

      // Appeler traverseQueue après une seconde
      setTimeout(traverseQueue, 0);
    }
  };

  traverseQueue(); // Démarre la boucle
}

// Fonction pour récupérer le chemin le plus court entre deux arrêts
function cheminLePlusCourt(parents, arrivée) {
  const chemin = [arrivée];
  let parent = parents[arrivée];
  while (parent) {
    chemin.unshift(parent);
    parent = parents[parent];
  }
  coloriseFinalPath(chemin);
  return chemin;
}

function coloriseFinalPath(path) {
  //invalidPath();
  path.forEach((stop) => {
    focusStop(stop, "start");
  });
}

function invalidPath() {
  g.selectAll(`circle`)
    .attr("r", 6)
    .attr("class", (d, i) => `${className} stop_${formaterChaine(d.name)} off`);
}

function search(departure, arrival) {
  dijkstra(graphik, departure, ({ distances, parents }) => {
    const chemin = cheminLePlusCourt(parents, arrival);
    console.log(
      "Le chemin le plus court de",
      departure,
      "à",
      arrival,
      ":",
      chemin,
      "distance de ",
      distances
    );
  });
}
