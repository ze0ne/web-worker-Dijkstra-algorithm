import dijkstra from "dijkstrajs";

var graph = {
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

var path = dijkstra.find_path(graph, "a", "i");

console.log("pathh", path);

fetch("http://127.0.0.1:5500/routes.json")
  .then((response) => response.json())
  .then((routes) => {
    const tableauTransport = [];

    routes.forEach((route) => {
      const stops = [];
      route.stops.forEach((stop) => {
        stops.push(stop.stop_name);
      });
      const toto = { ligne: route.route.route_id, arrets: stops };
      //console.log("toto", toto);
      tableauTransport.push(toto);
    });

    // Exemple de tableau de lignes de transports et d'arrêts

    // Création du graphe
    let graphe = {};

    // Exécution de l'algorithme de Dijkstra
    const depart = "Jean Rostand";
    const destination = "Commerce";

    //console.log("tableau", tableauTransport);
    // Remplissage du graphe
    tableauTransport.forEach((ligne) => {
      //console.log("ligne", ligne);
      for (let i = 0; i < ligne.arrets.length - 1; i++) {
        const depart = ligne.arrets[i];
        const arrivee = ligne.arrets[i + 1];
        const tempsTrajet = calculerTempsTrajet(depart, arrivee); // fonction à définir
        //console.log("tempsTrajet", depart, arrivee, tempsTrajet);
        ajouterArete(graphe, depart, arrivee, Math.round(tempsTrajet)); // fonction à définir
      }
    });

    //console.log("graph", graphe);
    // let shortestPath = dijkstra(graphe, "Jean Rostand", "Commerce");
    // console.log(shortestPath);
    let bidirectionalDijkstraPath = bidirectionalDijkstra(
      graphe,

      "Jean Rosand",
      "Commerce"
    );
    console.log("bidirectionalDijkstra", bidirectionalDijkstraPath);
  });

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

function dijkstraa(graph, start, end) {
  let shortestDistances = {};
  let parents = {};
  let unvisitedNodes = Object.keys(graph);

  for (let node of unvisitedNodes) {
    shortestDistances[node] = Infinity;
  }
  shortestDistances[start] = 0;

  while (unvisitedNodes.length > 0) {
    let closestNode = null;

    for (let node of unvisitedNodes) {
      if (
        closestNode === null ||
        shortestDistances[node] < shortestDistances[closestNode]
      ) {
        closestNode = node;
      }
    }

    let currentIndex = unvisitedNodes.indexOf(closestNode);
    unvisitedNodes.splice(currentIndex, 1);

    if (closestNode === end) {
      let path = [end];
      let parent = parents[end];

      while (parent) {
        path.push(parent);
        parent = parents[parent];
      }

      return path.reverse();
    }

    if (!isFinite(shortestDistances[closestNode])) {
      return null;
    }

    for (let neighbor of graph[closestNode]) {
      let distance = shortestDistances[closestNode] + neighbor.poids;

      if (distance < shortestDistances[neighbor.arrivee]) {
        shortestDistances[neighbor.arrivee] = distance;
        parents[neighbor.arrivee] = closestNode;
      }
    }
  }

  return null;
}

function bidirectionalDijkstra(graph, start, end) {
  let shortestDistancesStart = {};
  let shortestDistancesEnd = {};
  let parentsStart = {};
  let parentsEnd = {};
  let unvisitedNodesStart = Object.keys(graph);
  let unvisitedNodesEnd = Object.keys(graph);

  for (let node of unvisitedNodesStart) {
    shortestDistancesStart[node] = Infinity;
    shortestDistancesEnd[node] = Infinity;
  }
  shortestDistancesStart[start] = 0;
  shortestDistancesEnd[end] = 0;

  while (unvisitedNodesStart.length > 0 && unvisitedNodesEnd.length > 0) {
    // Forward pass
    let closestNodeStart = null;
    for (let node of unvisitedNodesStart) {
      if (
        closestNodeStart === null ||
        shortestDistancesStart[node] < shortestDistancesStart[closestNodeStart]
      ) {
        closestNodeStart = node;
      }
    }
    let currentIndexStart = unvisitedNodesStart.indexOf(closestNodeStart);
    unvisitedNodesStart.splice(currentIndexStart, 1);

    // Backward pass
    let closestNodeEnd = null;
    for (let node of unvisitedNodesEnd) {
      if (
        closestNodeEnd === null ||
        shortestDistancesEnd[node] < shortestDistancesEnd[closestNodeEnd]
      ) {
        closestNodeEnd = node;
      }
    }
    let currentIndexEnd = unvisitedNodesEnd.indexOf(closestNodeEnd);
    unvisitedNodesEnd.splice(currentIndexEnd, 1);

    // Check for meeting point
    if (closestNodeStart === closestNodeEnd) {
      // Paths meet, return combined path
      let path = [closestNodeStart];
      let parent = parentsStart[closestNodeStart];
      while (parent) {
        path.push(parent);
        parent = parentsStart[parent];
      }
      path.reverse();
      parent = parentsEnd[closestNodeStart];
      while (parent) {
        path.push(parent);
        parent = parentsEnd[parent];
      }
      return path;
    }

    // Update distances and parents for forward pass
    for (let neighbor of graph[closestNodeStart]) {
      let distance = shortestDistancesStart[closestNodeStart] + neighbor.poids;
      if (distance < shortestDistancesStart[neighbor.arrivee]) {
        shortestDistancesStart[neighbor.arrivee] = distance;
        parentsStart[neighbor.arrivee] = closestNodeStart;
      }
    }

    // Update distances and parents for backward pass
    for (let neighbor of graph[closestNodeEnd]) {
      let distance = shortestDistancesEnd[closestNodeEnd] + neighbor.poids;
      if (distance < shortestDistancesEnd[neighbor.arrivee]) {
        shortestDistancesEnd[neighbor.arrivee] = distance;
        parentsEnd[neighbor.arrivee] = closestNodeEnd;
      }
    }
  }

  return null;
}
