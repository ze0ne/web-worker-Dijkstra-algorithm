import { Component, Element, Host, Prop, State, h } from '@stencil/core';
import * as d3 from 'd3';
import * as L from 'leaflet';
@Component({
  tag: 'app-map',
  styleUrl: 'app-map.css',
  shadow: false,
})
export class AppMap {
  @Prop() isColorize: boolean;
  @Prop() isTooltipEnable = false;
  @Prop() fromTo = false;
  @Prop() onlyTram = false;
  @Prop() isMap = false;
  @Prop({ mutable: true }) isDark = false;

  mapUrl = '';
  map: L.Map;

  tooltip: any;

  @State() routes: any;

  stops: string[] = [];

  svg: any;
  g: any;

  graphe = {};
  async fetchData() {
    const response = await fetch('/assets/routes.json');
    if (response.ok) {
      this.routes = await response.json();
    } else {
      console.error('Erreur lors de la récupération des données:', response.statusText);
    }
  }

  calculerTempsTrajet() {
    // Implémentez votre propre logique pour calculer le temps de trajet
    return Math.random() * 60; // Temps de trajet aléatoire entre 0 et 60 minutes
  }

  // Fonction pour ajouter une arête au graphe (à définir)
  ajouterArete(depart, arrivee, poids) {
    if (!this.graphe[depart]) {
      this.graphe[depart] = [];
    }
    this.graphe[depart].push({ arrivee, poids });
    //console.log("graph", graphe);
  }

  @Element() el: HTMLElement;

  async loadMap() {
    if (this.isMap) {
      this.mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

      if (this.isDark) {
        this.mapUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      }
    }

    this.map = L.map(document.getElementById('map')).setView([47.2184, -1.5536], 13);

    // Ajouter une couche de tuiles OpenStreetMap à la carte
    L.tileLayer(this.mapUrl, {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    //this.map.on('zoom', this.zoomend());

    L.svg({ clickable: true }).addTo(this.map);
    this.svg = d3.select('#map').select('svg');
    this.g = this.svg.append('g');
    this.tooltip = d3.select('body').append('div').attr('class', 'tooltip');

    await this.fetchData();

    if (this.routes) {
      const tableauTransport = [];

      this.routes.forEach(route => {
        const stops = [];
        route.stops.forEach(stop => {
          stops.push(stop.stop_name);
        });
        const toto = { ligne: route.route.route_id, arrets: stops };
        tableauTransport.push(toto);
        const lineData = route.edges.map(edge => {
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
        const stopsData = route.stops.map(stop => {
          return {
            lat: stop.stop_lat,
            lon: stop.stop_lon,
            name: stop.stop_name,
          };
        });
        this.createLine({ ...route, edges: lineData, stops: stopsData });
        this.createStopPoint({ ...route, edges: lineData, stops: stopsData });
      });
      //this.map.on('moveend', this.updateAll());
      console.log('tass', tableauTransport);

      // Tableau pour stocker tous les arrêts uniques
      let arretsUniques = [];

      // Parcourir chaque objet dans le tableau
      tableauTransport.forEach(objet => {
        // Parcourir chaque arrêt dans l'objet
        objet.arrets.forEach(arret => {
          // Vérifier si l'arrêt n'existe pas déjà dans le tableau des arrêts uniques
          if (!arretsUniques.includes(arret)) {
            arretsUniques.push(arret);
          }
        });
      });

      console.log('arret', arretsUniques.sort());
      this.stops = arretsUniques.sort();

      // Remplissage du graphe
      tableauTransport.forEach(ligne => {
        for (let i = 0; i < ligne.arrets.length - 1; i++) {
          const depart = ligne.arrets[i];
          const arrivee = ligne.arrets[i + 1];
          const tempsTrajet = this.calculerTempsTrajet(); // fonction à définir
          this.ajouterArete(depart, arrivee, tempsTrajet); // fonction à définir
        }
      });

      this.graphe = this.creerGraphe(tableauTransport);

      console.log('graph', this.graphe);
    }
  }

  async componentDidLoad() {
    this.loadMap();
  }

  zoomend() {
    console.log('zoom');
  }

  creerGraphe(lignes) {
    const graphezz = {};

    // Parcourir chaque ligne
    lignes.forEach(ligne => {
      const arrets = ligne.arrets;
      //const ligneId = ligne.ligne;

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

  formaterChaine(chaine) {
    // Remplacer les caractères spéciaux par des tirets
    var chaineFormatee = chaine.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
    return chaineFormatee;
  }

  createLine(line) {
    const className = `route_${line.route.route_short_name}`;
    const lines = ['1-0', '2-0', '3-0', '4-0', '5-0'];
    if (this.onlyTram && !lines.includes(line.route.route_id)) {
      line.route.route_color = '00000011';
    }
    this.g
      .selectAll(`line.${className}`)
      .data(line.edges)
      .enter()
      .append('line')
      .attr('class', className)
      .style('stroke', `#${this.isColorize ? line.route.route_color : '000'}`) // Couleur des lignes
      .attr('class', className)
      .style('stroke-width', 3); // Épaisseur des lignes

    this.updateMap(line);
  }

  createStopPoint(line) {
    const className = `route_${line.route.route_short_name}`;
    this.g
      .selectAll(`circle.${className}`)
      .data(line.stops)
      .enter()
      .append('circle')
      .style('fill', `#${this.isColorize ? line.route.route_color : 'FFF'}`)
      .style('z-index', '0')
      .attr('class', d => `${className} stop_${this.formaterChaine(d.name)}`)
      .on('mouseover', (event, d) => {
        if (this.isTooltipEnable) {
          // Transition pour faire apparaître le tooltip
          this.tooltip.transition().duration(200).style('opacity', 1);

          // Définir le contenu HTML du tooltip et le style de la bordure
          this.tooltip.html(d.name).style('border-color', `#${line.route.route_color}`);

          // Calculer la position x du tooltip par rapport à la souris
          const xPosition = event.pageX - this.tooltip.node().offsetWidth / 2;

          // Définir la position du tooltip
          this.tooltip.style('left', xPosition + 'px').style('top', event.pageY - 40 + 'px');
        }
      })
      .attr('r', 4)
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('fill-opacity', 1);

    this.updateMap(line); // Mise à jour initiale des positions
  }

  focusStop(stop, className) {
    this.g
      .selectAll(`circle.stop_${this.formaterChaine(stop)}`)
      .attr('r', 6)
      .attr('class', d => `${className} stop_${this.formaterChaine(d.name)}`);
  }

  updateMap(line) {
    const className = `route_${line.route.route_short_name}`;
    // Mettre à jour les lignes
    d3.selectAll(`line.${className}`)
      .data(line.edges)
      .attr('x1', d => this.map.latLngToLayerPoint([d.source.lat, d.source.lon]).x)
      .attr('y1', d => this.map.latLngToLayerPoint([d.source.lat, d.source.lon]).y)
      .attr('x2', d => this.map.latLngToLayerPoint([d.target.lat, d.target.lon]).x)
      .attr('y2', d => this.map.latLngToLayerPoint([d.target.lat, d.target.lon]).y);

    //Mettre à jour les cercles
    d3.selectAll(`circle.${className}`)
      .attr('cx', d => this.map.latLngToLayerPoint([d.lat, d.lon]).x)
      .attr('cy', d => this.map.latLngToLayerPoint([d.lat, d.lon]).y);
  }

  updateAll() {
    console.log('updateAll');
    this.routes.forEach(route => {
      const lineData = route.edges.map(edge => {
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
      const stopsData = route.stops.map(stop => {
        return {
          lat: stop.stop_lat,
          lon: stop.stop_lon,
          name: stop.stop_name,
        };
      });
      const line = { ...route, edges: lineData, stops: stopsData };

      this.updateMap(line);
    });
  }

  dijkstra(departure, callback) {
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

  // Fonction pour récupérer le chemin le plus court entre deux arrêts
  cheminLePlusCourt(parents, arrivée) {
    const chemin = [arrivée];
    let parent = parents[arrivée];
    while (parent) {
      chemin.unshift(parent);
      parent = parents[parent];
    }
    this.coloriseFinalPath(chemin);
    return chemin;
  }

  coloriseFinalPath(path) {
    //invalidPath();
    path.forEach(stop => {
      this.focusStop(stop, 'start');
    });
  }

  invalidPath() {
    // const className = `route_${line.route.route_short_name}`;
    // this.g.selectAll(`circle`)
    //   .attr("r", 6)
    //   .attr("class", (d, i) => `${className} stop_${this.formaterChaine(d.name)} off`);
  }

  search(departure, arrival, event): void {
    this.dijkstra(departure, ({ distances, parents }) => {
      const chemin = this.cheminLePlusCourt(parents, arrival);
      console.log('Le chemin le plus court de', departure, 'à', arrival, ':', chemin, 'distance de ', distances);
    });
  }

  darkMode(event) {
    console.log('DARK');
    this.isDark = true;
    this.loadMap();
  }

  render() {
    const departureInput = document.querySelector<HTMLSelectElement>('#departure');
    const arrivalInput = document.querySelector<HTMLSelectElement>('#arrival');

    console.log('deee', departureInput);

    return (
      <Host>
        {this.fromTo && (
          <div class="w-80 bg-white rounded-md shadow-md overflow-hidden">
            <div class="w-full bg-gray-200 text-gray-700 px-4 py-2">
              <h2 class="text-lg font-semibold">Planification de Voyage</h2>
            </div>
            <div class="p-4 w-full">
              <div class="mb-4">
                <label htmlFor="departure" class="block text-gray-700 font-bold mb-2">
                  Départ :
                </label>
                <select id="departure" name="departure" class={'w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400'}>
                  {this.stops.map(option => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div class="mb-4">
                <label htmlFor="arrival" class="block text-gray-700 font-bold mb-2">
                  Arrivée :
                </label>
                <select id="arrival" name="arrival" class={'w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400'}>
                  {this.stops.map(option => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  onClick={event => this.search(departureInput.value, arrivalInput.value, event)}
                  class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Rechercher Itinéraire
                </button>
              </div>
              <div class={'mt-6'}>
                <button onClick={event => this.darkMode(event)} class="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                  Dark mode
                </button>
              </div>
            </div>
          </div>
        )}

        <div id="map" class={'h-full w-full'}></div>
        <slot></slot>
      </Host>
    );
  }
}
