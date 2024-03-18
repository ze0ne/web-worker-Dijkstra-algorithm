onmessage = function (message) {
  console.log('data', message);
  if (message.data.cmd == 'startSearch') {
    const { departure, arrival } = message.data.data;
    console.log('startSearch', departure, arrival);
  }
  console.log('Message reçu depuis le script principal!.');
};

self.onmessage = e => {
  dojob(e.data.initialCount);
  postMessage({ fini: true });
};

function dojob(initialCount) {
  // simulation d'un long traitement
  for (let i = initialCount; i <= 500000; i++) {
    postMessage({ count: i });
  }
}

function dijkstra(departure, callback) {
  const distances = {};
  const visited = {};
  const parents = {};
  const queue = [];

  // Initialisation des distances et des parents
  for (let sommet in this.graphe) {
    distances[sommet] = Infinity;
    parents[sommet] = null;
  }
  distances[departure] = 0;

  // Ajouter le nœud de départ à la file d'attente
  queue.push(departure);

  // Tant que la file d'attente n'est pas vide
  const traverseQueue = () => {
    if (queue.length > 0) {
      // Retirer le nœud avec la plus petite distance de la file d'attente
      const courant = queue.shift();
      this.focusStop(courant, 'active');
      visited[courant] = true;

      // Parcourir les voisins du nœud courant
      for (let voisin in this.graphe[courant]) {
        if (!visited[voisin]) {
          const poids = this.graphe[courant][voisin];
          const distance = distances[courant] + poids;

          // Mettre à jour la distance et le parent si la nouvelle distance est plus courte
          if (distance < distances[voisin]) {
            distances[voisin] = distance;
            parents[voisin] = courant;
            queue.push(voisin);
          } else {
            this.focusStop(voisin, 'off');
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
