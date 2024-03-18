import { Component, Element, Host, Listen, State, h } from '@stencil/core';

@Component({
  tag: 'app-bouncing-ball',
  styleUrl: 'app-bouncing-ball.css',
  shadow: true,
})
export class AppBouncingBall {
  @State() isDragging: boolean = false;
  gravityInterval: NodeJS.Timeout;

  @Element() hostElement: HTMLElement; // Reference to the host element

  container: HTMLElement;
  circle: HTMLElement;

  componentDidLoad() {
    this.container = this.hostElement.shadowRoot.querySelector('#container');
    this.circle = this.hostElement.shadowRoot.querySelector('#circle');
  }

  @Listen('mousemove')
  handleMouseMove(ev: MouseEvent) {
    if (!this.isDragging) {
      let x = ev.clientX - this.container.getBoundingClientRect().left - this.circle.offsetWidth / 2;
      let y = ev.clientY - this.container.getBoundingClientRect().top - this.circle.offsetHeight / 2;

      // Keep the circle inside the container
      x = Math.min(Math.max(x, 0), this.container.offsetWidth - this.circle.offsetWidth);
      y = Math.min(Math.max(y, 0), this.container.offsetHeight - this.circle.offsetHeight);

      this.circle.style.left = x + 'px';
      this.circle.style.top = y + 'px';
    }
  }

  @Listen('mouseleave')
  handleMouseLeave(ev: MouseEvent) {
    clearInterval(this.gravityInterval);
    const circleRect = this.circle.getBoundingClientRect();
    let velocityY = 0;
    const gravity = 0.5;
    const bounceFactor = 0.85;
    this.gravityInterval = setInterval(() => {
      velocityY += gravity;
      this.circle.style.top = parseFloat(this.circle.style.top) + velocityY + 'px';
      if (parseFloat(this.circle.style.top) + this.circle.offsetHeight >= this.container.offsetHeight) {
        this.circle.style.top = this.container.offsetHeight - this.circle.offsetHeight + 'px';
        velocityY = -velocityY * bounceFactor;

        // Soft deformation effect
        this.circle.style.transform = 'scaleY(0.8)';
        setTimeout(() => {
          this.circle.style.transform = 'scale(1)';
        }, 200);
      }
    }, 20);
  }

  @Listen('mouseenter')
  handleMouseEnter(ev: MouseEvent) {
    clearInterval(this.gravityInterval);
  }

  @Listen('mousedown')
  handleLeave(ev: MouseEvent) {
    console.log('leave', ev);
  }

  render() {
    return (
      <Host>
        <div id="container">
          <div id="circle"></div>
        </div>
      </Host>
    );
  }
}
