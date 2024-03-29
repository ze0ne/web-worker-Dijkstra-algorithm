import {
  closeDb,
  openDb,
  getTrips,
  getStoptimes,
  getStops,
  getStopAttributes,
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

const station = getStopName("GBLO2");

// trips.forEach((trip) => {
//   //console.log(trip);
// });

function getLigne(route_id, service_id) {
  const trip = getTrips(
    {
      service_id,
      route_id,
    },
    ["service_id", "trip_id"]
  )[0];
  const stoptimes = getStoptimes(
    {
      trip_id: trip.trip_id,
    },
    ["stop_id"],
    [["stop_sequence", "ASC"]]
  );
  stoptimes.map((stop) => (stop.name = getStopName(stop.stop_id)));
  //console.log(stoptimes);
  return stoptimes;
}

//stoptimes.map((stop) => (stop.name = getStopName(stop.stop_id)));

//console.log(stoptimes);

const line1 = getLigne("1-0", "CR_23_24-HD24H2B5-Vendredi-02");
const line2 = getLigne("2-0", "CR_23_24-HT24H105-Vendredi-03");
const line3 = getLigne("3-0", "CR_23_24-HS24H1J5-Vendredi-01");
const line4 = getLigne("4-0", "CR_23_24-HT24H105-Vendredi-03");
const line5 = getLigne("5-0", "CR_23_24-HT24H105-Vendredi-03");

// Fonction pour créer une arête pondérée
function createWeightedEdge(source, target, weight) {
  return { source, target, weight };
}

// Initialiser un tableau pour stocker les arêtes pondérées
const weightedEdges = [];

// Ajouter les arêtes pondérées pour chaque ligne de transport
function addWeightedEdges(line) {
  for (let i = 0; i < line.length - 1; i++) {
    const source = line[i];
    const target = line[i + 1];
    // Vous pouvez définir le poids de l'arête selon vos critères,
    // par exemple, la distance entre les arrêts, le temps de trajet, etc.
    const weight = 1; // Pour l'exemple, le poids est fixé à 1
    weightedEdges.push(createWeightedEdge(source, target, weight));
  }
}

addWeightedEdges(line1);
addWeightedEdges(line2);
addWeightedEdges(line3);
//console.log(addWeightedEdges(line1));

//console.log(weightedEdges);

weightedEdges.forEach((edge) => {
  console.log(
    `${edge.source.name} -> ${edge.target.name} (Poids : ${edge.weight})`
  );
});

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
