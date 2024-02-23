// Définir les tableaux des arrêts pour chaque ligne de transport
const line1 = [
  { stop_id: "FMIT1", name: "François Mitterrand" },
  { stop_id: "TMLI1", name: "Tourmaline" },
  { stop_id: "SECH1", name: "Schoelcher" },
  { stop_id: "FRAC1", name: "Frachon" },
  { stop_id: "NRDA1", name: "Neruda" },
  { stop_id: "TENA1", name: "Tertre" },
  { stop_id: "RMNE1", name: "Romanet" },
  { stop_id: "BLVU1", name: "Mendès France - Bellevue" },
  { stop_id: "RROL1", name: "Romain Rolland" },
  { stop_id: "LAUR1", name: "Lauriers" },
  { stop_id: "JMLI1", name: "Jean Moulin" },
  { stop_id: "XBON1", name: "Croix Bonneau" },
  { stop_id: "EGLI1", name: "Egalité" },
  { stop_id: "DCFF1", name: "Du Chaffault" },
  { stop_id: "GMAR1", name: "Gare Maritime" },
  { stop_id: "CNAV1", name: "Chantiers Navals" },
  { stop_id: "MDTH1", name: "Médiathèque" },
  { stop_id: "COMC1", name: "Commerce" },
  { stop_id: "BOFA1", name: "Bouffay" },
  { stop_id: "DCAN1", name: "Duchesse Anne-Chateau" },
  { stop_id: "GSNO1", name: "Gare Nord" },
  { stop_id: "MNFA1", name: "Manufacture" },
  { stop_id: "MOUT1", name: "Moutonnerie" },
  { stop_id: "HBLI1", name: "Hôpital Bellier" },
  { stop_id: "BDOU1", name: "Bd de Doulon" },
  { stop_id: "MDOU1", name: "Mairie de Doulon" },
  { stop_id: "LDRE1", name: "Landreau" },
  { stop_id: "SOUI1", name: "Souillarderie" },
  { stop_id: "PISE1", name: "Pin Sec" },
  { stop_id: "HALD1", name: "Haluchère - Batignolles" },
  { stop_id: "HAVE1", name: "Halvêque" },
  { stop_id: "BJOI1", name: "Beaujoire" },
];

const line2 = [
  { stop_id: "OGVA2", name: "Orvault Grand Val" },
  { stop_id: "LCAR2", name: "Le Cardo" },
  { stop_id: "RCAS2", name: "René Cassin" },
  { stop_id: "CDAN2", name: "Chêne des Anglais" },
  { stop_id: "SADU2", name: "Santos Dumont" },
  { stop_id: "BOSI2", name: "Boissière" },
  { stop_id: "BOGE2", name: "Bourgeonnière" },
  { stop_id: "RTSC2", name: "Recteur Schmitt" },
  { stop_id: "ECSU2", name: "Ecole Centrale-Audencia" },
  { stop_id: "FACU2", name: "Facultés" },
  { stop_id: "MORH2", name: "Morrhonnière - Petit Port" },
  { stop_id: "MICH2", name: "Michelet" },
  { stop_id: "SFEL2", name: "St-Félix" },
  { stop_id: "MOTE2", name: "Motte Rouge" },
  { stop_id: "SMHI2", name: "St-Mihiel" },
  { stop_id: "OTAG2", name: "50 Otages" },
  { stop_id: "CRQU2", name: "Place du Cirque" },
  { stop_id: "COME2", name: "Commerce" },
  { stop_id: "HODI2", name: "Hôtel Dieu" },
  { stop_id: "ADEL2", name: "Aimé Delrue" },
  { stop_id: "VGAC2", name: "Vincent Gâche" },
  { stop_id: "WATT2", name: "Wattignies" },
  { stop_id: "MGIN2", name: "Mangin" },
  { stop_id: "PIRB2", name: "Pirmil" },
  { stop_id: "GPRO2", name: "Gare de Pont Rousseau" },
];

const line3 = [
  { stop_id: "NETR1", name: "Neustrie" },
  { stop_id: "COET1", name: "Les Couëts" },
  { stop_id: "GDOU1", name: "Grande Ouche" },
  { stop_id: "TROC1", name: "Trocardière" },
  { stop_id: "DIDE1", name: "Espace Diderot" },
  { stop_id: "CREZ1", name: "Château de Rezé" },
  { stop_id: "BALI1", name: "Balinière" },
  { stop_id: "MAI81", name: "8 Mai" },
  { stop_id: "PROU1", name: "Pont Rousseau Martyrs" },
  { stop_id: "PIRC1", name: "Pirmil" },
  { stop_id: "MGIN1", name: "Mangin" },
  { stop_id: "WATT1", name: "Wattignies" },
  { stop_id: "VGAC1", name: "Vincent Gâche" },
  { stop_id: "ADEL1", name: "Aimé Delrue" },
  { stop_id: "HODI1", name: "Hôtel Dieu" },
  { stop_id: "COME1", name: "Commerce" },
  { stop_id: "BRTA1", name: "Bretagne" },
  { stop_id: "JJNA1", name: "Jean Jaurès" },
  { stop_id: "VIAR1", name: "Viarme-Talensac" },
  { stop_id: "POIT1", name: "Poitou" },
  { stop_id: "FFAU1", name: "Félix Faure" },
  { stop_id: "RVAN1", name: "Rond-Point de Vannes" },
  { stop_id: "STHR1", name: "Alexandre Vincent-Ste-Thérèse" },
  { stop_id: "LONG1", name: "Longchamp" },
  { stop_id: "BSEJ1", name: "Beauséjour" },
  { stop_id: "PSCE1", name: "Plaisance" },
  { stop_id: "FERI1", name: "Ferrière" },
  { stop_id: "JROS1", name: "Jean Rostand" },
  { stop_id: "BNON1", name: "Bignon" },
  { stop_id: "OMRL1", name: "Orvault Morlière" },
  { stop_id: "SILL1", name: "Sillon de Bretagne" },
  { stop_id: "MPAU1", name: "Marcel Paul" },
];

line4 = [
  { stop_id: "FOCH1", name: "Foch-Cathédrale" },
  { stop_id: "DCAN4", name: "Duchesse Anne-Chateau" },
  { stop_id: "CDCO2", name: "Cité des Congrès" },
  { stop_id: "TPOD2", name: "Tripode" },
  { stop_id: "IDNA2", name: "Ile de Nantes" },
  { stop_id: "BENA2", name: "Beaulieu" },
  { stop_id: "GNRA2", name: "Greneraie" },
  { stop_id: "BGAR2", name: "Bonne Garde" },
  { stop_id: "CTOR2", name: "Clos Toreau" },
  { stop_id: "MVSI2", name: "Mauvoisins" },
  { stop_id: "BODO2", name: "Bourdonnières" },
  { stop_id: "JLVE2", name: "Joliverie" },
  { stop_id: "CVER2", name: "Chapeau Verni" },
  { stop_id: "MRAI2", name: "Maraîchers" },
  { stop_id: "PVTO2", name: "Porte de Vertou" },
];

line5 = [
  { stop_id: "HBAN2", name: "Hangar à Bananes" },
  { stop_id: "QANT2", name: "Quai des Antilles" },
  { stop_id: "PDUC2", name: "Prairie au Duc" },
  { stop_id: "GRET2", name: "Gare de l'Etat" },
  { stop_id: "RPBL4", name: "République" },
  { stop_id: "NIZA2", name: "Nizan" },
  { stop_id: "VGAC4", name: "Vincent Gâche" },
  { stop_id: "FOND2", name: "Fonderies" },
  { stop_id: "IDNA2", name: "Ile de Nantes" },
  { stop_id: "CSVA2", name: "Conservatoire" },
  { stop_id: "GLNE2", name: "Galarne" },
  { stop_id: "PPDO2", name: "Pompidou" },
  { stop_id: "HAUB1", name: "Haubans" },
  { stop_id: "BRLN1", name: "Berlin" },
  { stop_id: "GSSU4", name: "Gare Sud" },
];

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

// Afficher les arêtes pondérées
//console.log(weightedEdges);

const lines = [line1, line2, line3, line4, line5];

// Initialiser la liste d'adjacence
const adjacencyList = {};

// Fonction pour ajouter un arrêt à la liste d'adjacence
function addStopToAdjacencyList(stop) {
  if (!adjacencyList[stop.name]) {
    adjacencyList[stop.name] = [];
  }
}

// Parcourir les lignes et construire la liste d'adjacence
lines.forEach((line) => {
  line.forEach((stop, i) => {
    addStopToAdjacencyList(stop);
    if (i > 0) {
      adjacencyList[stop.name].push(line[i - 1].name);
      adjacencyList[line[i - 1].name].push(stop.name);
    }
  });
});

// Afficher la liste d'adjacence

console.log(adjacencyList);

var g = new jsgraphs.Graph(13);
g.addEdge(0, 5);
g.addEdge(4, 3);
g.addEdge(0, 1);
g.addEdge(9, 12);
g.addEdge(6, 4);
g.addEdge(5, 4);
g.addEdge(0, 2);
g.addEdge(11, 12);
g.addEdge(9, 10);
g.addEdge(0, 6);
g.addEdge(7, 8);
g.addEdge(9, 11);
g.addEdge(5, 3);

var cc = new jsgraphs.ConnectedComponents(g);
console.log(cc.componentCount()); // display 3
for (var v = 0; v < g.V; ++v) {
  console.log("id[" + v + "]: " + cc.componentId(v));
}

var g_nodes = [];
var g_edges = [];
for (var v = 0; v < g.V; ++v) {
  g.node(v).label = "Node " + v; // assigned 'Node {v}' as label for node v
  g_nodes.push({
    id: v,
    label: g.node(v).label,
    group: cc.componentId(v),
  });

  var adj_v = g.adj(v);
  for (var i = 0; i < adj_v.length; ++i) {
    var w = adj_v[i];
    if (w > v) continue; // make sure only one edge between w and v since the graph is undirected
    g_edges.push({
      from: v,
      to: w,
    });
  }
}

console.log(g.V); // display 6, which is the number of vertices in g
console.log(g.adj(0)); // display [5, 1, 2], which is the adjacent list to vertex 0

var nodes = new vis.DataSet(g_nodes);

// create an array with edges
var edges = new vis.DataSet(g_edges);

// create a network
var container = document.getElementById("mynetwork");
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {};
var network = new vis.Network(container, data, options);
