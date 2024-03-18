import { Component, Host, State, h } from '@stencil/core';
import { countDown } from '../../stuff.worker';

@Component({
  tag: 'app-counter',
  styleUrl: 'app-counter.css',
  shadow: true,
})
export class AppCounter {
  @State() toto: number = 0;

  start = () => {
    this.toto = 0;
    for (let i = 0; i <= 99999; i++) {
      console.log('i', i);
      // affichage du compteur
      this.toto = i;
    }
  };

  startWorker = () => {
    this.toto = 0;

    // Modifiez ceci pour assurer le bon contexte du 'this'
    console.log('start');
    countDown(99999, p => {
      console.log('progress', p);
      this.toto = p;
    }).then(result => {
      console.log('finish', result);
    });
  };

  render() {
    return (
      <Host>
        <button onClick={this.startWorker}>GO WORKER</button>
        <br />
        <br />
        <button onClick={this.start}>GO</button>
        <div class="counter">{this.toto}</div>
        <slot></slot>
      </Host>
    );
  }
}
