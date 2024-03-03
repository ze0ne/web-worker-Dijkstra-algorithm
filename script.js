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

const drag = d3
  .drag()
  .on("start", dragstarted)
  .on("drag", dragged)
  .on("end", dragended);

function dragstarted(event, d) {
  d3.select(this).raise().classed("active", true);
}

function dragged(event, d) {
  // Mise à jour de la position du nœud
  d.x = event.x;
  d.y = event.y;
  d3.select(this).attr("cx", d.x).attr("cy", d.y);

  // Mise à jour des lignes connectées et des distances
  svg.selectAll("line").each(function (l) {
    if (l.source === d || l.target === d) {
      d3.select(this)
        .attr("x1", l.source.x)
        .attr("y1", l.source.y)
        .attr("x2", l.target.x)
        .attr("y2", l.target.y);

      // Recalcul de la distance
      l.distance = calculateDistance(l.source, l.target);
    }
  });

  // Mise à jour des étiquettes de distance
  svg
    .selectAll(".linkText")
    .text((l) => Math.round(l.distance))
    .attr("x", (l) => (l.source.x + l.target.x) / 2)
    .attr("y", (l) => (l.source.y + l.target.y) / 2);

  // Mise à jour de la position des étiquettes de nœud
  d3.selectAll(".nodeText")
    .attr("x", function (d) {
      return d.x + 10;
    })
    .attr("y", function (d) {
      return d.y;
    });
}

function dragended(event, d) {
  d3.select(this).classed("active", false);
}

function calculateDistance(source, target) {
  return Math.sqrt(
    Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2)
  );
}

// Données des nœuds
const nodes = [
  { id: "A", x: 50, y: 300 },
  { id: "B", x: 200, y: 50 },
  { id: "C", x: 350, y: 250 },
  { id: "D", x: 500, y: 400 },
  { id: "E", x: 650, y: 150 },
  { id: "F", x: 800, y: 300 },
];

// Données des liens (avec distances)
const links = [
  { source: nodes[0], target: nodes[1], distance: 200 }, // A-B
  { source: nodes[1], target: nodes[2], distance: 136 }, // B-C
  { source: nodes[2], target: nodes[3], distance: 152 }, // C-D
  { source: nodes[3], target: nodes[4], distance: 170 }, // D-E
  { source: nodes[4], target: nodes[5], distance: 78 }, // E-F
  { source: nodes[0], target: nodes[2], distance: 136 }, // A-C
  { source: nodes[1], target: nodes[5], distance: 260 }, // B-F
  { source: nodes[2], target: nodes[4], distance: 131 }, // C-E
  { source: nodes[0], target: nodes[3], distance: 130 }, // A-D
];

// Sélection de l'élément SVG
const svg = d3.select("#myGraph");

// Dessin des liens
links.forEach((link) => {
  const sourceNode = nodes.find((node) => node.id === link.source.id);
  const targetNode = nodes.find((node) => node.id === link.target.id);

  // Ligne
  // svg
  //   .append("line")
  //   .attr("x1", sourceNode.x)
  //   .attr("y1", sourceNode.y)
  //   .attr("x2", targetNode.x)
  //   .attr("y2", targetNode.y)
  //   .attr("stroke", "black");

  // Texte pour la distance
  const midX = (sourceNode.x + targetNode.x) / 2;
  const midY = (sourceNode.y + targetNode.y) / 2;
});

// Dessin des nœuds
nodes.forEach((node) => {
  // Cercle pour le nœud
  // svg
  //   .append("circle")
  //   .attr("cx", node.x)
  //   .attr("cy", node.y)
  //   .attr("r", 5)
  //   .attr("fill", "blue");

  // Texte pour le nom du nœud
  svg
    .selectAll(".nodeText")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "nodeText")
    .attr("x", (d) => d.x + 10)
    .attr("y", (d) => d.y)
    .text((d) => d.id);
});

svg
  .selectAll("circle")
  .data(nodes) // Assurez-vous que c'est bien la variable contenant vos nœuds
  .enter()
  .append("circle")
  .attr("cx", (d) => d.x)
  .attr("cy", (d) => d.y)
  .attr("r", 5)
  .attr("fill", "blue")
  .call(drag); // Ici, vous appliquez la fonction de drag

svg
  .selectAll("line")
  .data(links)
  .enter()
  .append("line")
  .attr("x1", (d) => d.source.x)
  .attr("y1", (d) => d.source.y)
  .attr("x2", (d) => d.target.x)
  .attr("y2", (d) => d.target.y)
  .attr("stroke", "red");

svg
  .selectAll(".linkText")
  .data(links)
  .enter()
  .append("text")
  .attr("class", "linkText")
  .attr("x", (d) => (d.source.x + d.target.x) / 2)
  .attr("y", (d) => (d.source.y + d.target.y) / 2)
  .text((d) => d.distance);
