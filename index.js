import { writeFile } from "fs/promises";

import {
  closeDb,
  openDb,
  getTrips,
  getStoptimes,
  getStops,
  getStopAttributes,
  getRoutes,
} from "gtfs";
import { readFile } from "fs/promises";
const config = JSON.parse(
  await readFile(new URL("./config.json", import.meta.url))
);
const db = openDb(config);

getStopAttributes;

// Get all stoptimes for a specific trip, sorted by stop_sequence

// const trips = getTrips({
//   trip_headsign: "Hangar à Bananes",
//   service_id: "CR_23_24-HT24H101-L-Ma-Me-J-01",
//   route_id: "5-0",
// });

function getStopName(stop) {
  return getStops(
    {
      stop_id: stop,
    },
    ["stop_name"]
  )[0]["stop_name"];
}

function getStopInfos(stop) {
  return getStops({
    stop_id: stop,
  })[0];
}

function getRoutesInfos(route_id) {
  return getRoutes({
    route_id,
  })[0];
}

const station = getStopName("GBLO2");

// trips.forEach((trip) => {
//   //console.log(trip);
// });

function getLigne(route_id, service_id) {
  const routeInfos = getRoutesInfos(route_id);

  const trip = getTrips(
    {
      service_id,
      route_id,
    },
    ["service_id", "trip_id"]
  )[0];
  let stoptimes = getStoptimes(
    {
      trip_id: trip.trip_id,
    },
    [],
    [["stop_sequence", "ASC"]]
  );
  stoptimes = stoptimes.map((stop) => ({
    ...stop,
    ...getStopInfos(stop.stop_id),
  }));
  const data = {
    route: routeInfos,
    stoptimes,
  };
  return data;
}

//stoptimes.map((stop) => (stop.name = getStopName(stop.stop_id)));

//console.log(stoptimes);

const line1 = getLigne("1-0", "CR_23_24-HD24H2B5-Vendredi-02");
const line2 = getLigne("2-0", "CR_23_24-HT24H105-Vendredi-03");
const line3 = getLigne("3-0", "CR_23_24-HS24H1J5-Vendredi-01");
const line4 = getLigne("4-0", "CR_23_24-HT24H105-Vendredi-03");
const line5 = getLigne("5-0", "CR_23_24-HT24H105-Vendredi-03");
const c6 = getLigne("C6-0", "CR_23_24-HD24P105-Vendredi-21");
const c1 = getLigne("C1-0", "CR_23_24-HD24P105-Vendredi-21");
const c2 = getLigne("C2-0", "CR_23_24-HS24P1J5-Vendredi-20-0000100");
const c3 = getLigne("C3-0", "CR_23_24-HS24P1J5-Vendredi-20-0000100");

//console.log(line1);

// Fonction pour créer une arête pondérée
function createWeightedEdge(source, target, weight) {
  return { source, target, weight };
}

// Initialiser un tableau pour stocker les arêtes pondérées
const weightedEdges = [];
const routes = [];

// Ajouter les arêtes pondérées pour chaque ligne de transport
function addWeightedEdges(line) {
  const weightedEdges = [];
  for (let i = 0; i < line.stoptimes.length - 1; i++) {
    const source = line.stoptimes[i];
    const target = line.stoptimes[i + 1];
    // Vous pouvez définir le poids de l'arête selon vos critères,
    // par exemple, la distance entre les arrêts, le temps de trajet, etc.
    const weight = 1; // Pour l'exemple, le poids est fixé à 1
    weightedEdges.push(createWeightedEdge(source, target, weight));
  }
  routes.push({
    route: line.route,
    stops: line.stoptimes,
    edges: weightedEdges,
  });
}

//console.log(routes);

const trams = [
  {
    name: "1-0",
    trip_id: "CR_23_24-HD24H2B5-Vendredi-02",
  },
  {
    name: "2-0",
    trip_id: "CR_23_24-HT24H105-Vendredi-03",
  },
  {
    name: "3-0",
    trip_id: "CR_23_24-HS24H1J5-Vendredi-01",
  },
];

const chronobus = [
  {
    name: "4-0",
    trip_id: "CR_23_24-HT24H105-Vendredi-03",
  },
  {
    name: "5-0",
    trip_id: "CR_23_24-HT24H105-Vendredi-03",
  },
  {
    name: "C1-0",
    trip_id: "CR_23_24-HD24P105-Vendredi-21",
  },
  {
    name: "C2-0",
    trip_id: "CR_23_24-HS24P1J5-Vendredi-20-0000100",
  },
  {
    name: "C3-0",
    trip_id: "CR_23_24-HS24P1J5-Vendredi-20-0000100",
  },
  {
    name: "C4-0",
    trip_id: "CR_23_24-HT24P105-Vendredi-23-0000100",
  },
  {
    name: "C6-0",
    trip_id: "CR_23_24-HD24P105-Vendredi-21",
  },
  {
    name: "C7-0",
    trip_id: "CR_23_24-HD24P105-Vendredi-21-0000100",
  },
  {
    name: "C9-0",
    trip_id: "CR_23_24-HT24P105-Vendredi-23-0000100",
  },
  {
    name: "C20-0",
    trip_id: "CR_23_24-HS24P1J5-Vendredi-20",
  },
];

const bus = [
  {
    name: "10-0",
    trip_id: "CR_23_24-HD24P105-Vendredi-21",
  },
  {
    name: "11-0",
    trip_id: "CR_23_24-HD24P105-Vendredi-21",
  },
  {
    name: "12-0",
    trip_id: "CR_23_24-HS24P1J5-Vendredi-20",
  },
  {
    name: "23-0",
    trip_id: "CR_23_24-HD24P105-Vendredi-21",
  },
  {
    name: "26-0",
    trip_id: "CR_23_24-HT24P105-Vendredi-23",
  },
  {
    name: "27-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  {
    name: "28-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27-0000100",
  },
  {
    name: "30-0",
    trip_id: "CR_23_24-HT24P105-Vendredi-23",
  },
  {
    name: "33-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  {
    name: "36-0",
    trip_id: "CR_23_24-HT24P105-Vendredi-23",
  },
  {
    name: "38-0",
    trip_id: "CR_23_24-HT24P105-Vendredi-23",
  },
  {
    name: "40-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  {
    name: "42-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  {
    name: "47-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  {
    name: "50-0",
    trip_id: "CR_23_24-HS24P1J5-Vendredi-20",
  },
  {
    name: "54-0",
    trip_id: "CR_23_24-HS24P1J5-Vendredi-20",
  },
  {
    name: "59-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  {
    name: "60-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  {
    name: "66-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  {
    name: "67-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  {
    name: "69-0",
    trip_id: "CR_23_24-HS24P1J5-Vendredi-20",
  },
  {
    name: "71-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  {
    name: "75-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  {
    name: "77-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  ,
  {
    name: "78-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  ,
  {
    name: "79-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  ,
  {
    name: "80-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  ,
  {
    name: "81-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  ,
  {
    name: "85-0",
    trip_id: "CR_23_24-HD24P105-Vendredi-21",
  },
  ,
  {
    name: "86-0",
    trip_id: "CR_23_24-HS24P1J5-Vendredi-20",
  },
  ,
  {
    name: "87-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  ,
  {
    name: "88-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  ,
  {
    name: "89-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  ,
  {
    name: "91-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  ,
  {
    name: "93-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  ,
  {
    name: "95-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  ,
  {
    name: "96-0",
    trip_id: "CR_23_24-HA24P105-Vendredi-27",
  },
  ,
  {
    name: "97-0",
    trip_id: "CR_23_24-HT24P105-Vendredi-23",
  },
  {
    name: "98-0",
    trip_id: "CR_23_24-HT24P105-Vendredi-23",
  },
];

const lines = [...trams, ...chronobus, ...bus];
lines.forEach((line) => {
  if (line && line.disable !== true) {
    const data = getLigne(line.name, line.trip_id);
    if (data) {
      addWeightedEdges(data);
    }
  }
});

exportData(routes);

// weightedEdges.forEach((edge) => {
//   console.log(
//     `${edge.source.name} -> ${edge.target.name} (Poids : ${edge.weight})`
//   );
// });

// Afficher les arêtes pondérées
///console.log(weightedEdges);
//getLigne("5-0");

// // Compter les occurrences de chaque service_id
// const countOccurrences = trips.reduce((acc, { service_id }) => {
//   acc[service_id] = (acc[service_id] || 0) + 1;
//   return acc;
// }, {});

// // Convertir en tableau, trier par nombre d'occurrences décroissant, puis formater
// const formattedOccurrences = Object.entries(countOccurrences)
//   .sort((a, b) => b[1] - a[1]) // Trie par nombre d'occurrences décroissant
//   .map(([service_id, count]) => `service: ${service_id}, count: ${count}`);

// // Afficher chaque service_id avec son nombre d'occurrences
// formattedOccurrences.forEach((occurrence) => console.log(occurrence));
//console.log("Stop :" + station);

function exportData(data) {
  const jsonData = JSON.stringify(data);

  // Écriture de la chaîne JSON dans un fichier
  (async () => {
    try {
      await writeFile("routes.json", jsonData, "utf8");
      console.log("Le fichier JSON a été créé avec succès !");
    } catch (err) {
      console.error("Erreur lors de l'écriture du fichier :", err);
    }
  })();
}
