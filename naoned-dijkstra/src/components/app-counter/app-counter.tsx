import { Component, Host, State, h } from '@stencil/core';
import { countUp, countUpInterval } from '../../stuff.worker';

@Component({
  tag: 'app-counter',
  styleUrl: 'app-counter.css',
  shadow: true,
})
export class AppCounter {
  @State() count: number = 0;

  bigNum = 999999999;

  start = () => {
    this.count = 0;
    for (let i = 0; i <= this.bigNum; i++) {
      //console.log('i', i);
      this.count = i;
    }
  };

  startWorker = () => {
    this.count = 0;
    countUp(this.bigNum, p => {
      //console.log('progress', p);
      this.count = p;
    }).then(result => {
      console.log('finish', result);
    });
  };

  startWorkerInterval = () => {
    this.count = 0;
    countUpInterval(this.bigNum, p => {
      //console.log('progress interval', p);
      this.count = p;
    }).then(result => {
      console.log('finish', result);
    });
  };

  render() {
    return (
      <Host>
        <button onClick={this.start}>SANS WORKER</button>&nbsp;&nbsp;
        <button onClick={this.startWorker}>AVEC WORKER</button>&nbsp;&nbsp;
        <button onClick={this.startWorkerInterval}>AVEC WORKER Interval</button>
        <br />
        <br />
        <div class="counter">{this.count}</div>
        <slot></slot>
      </Host>
    );
  }
}
