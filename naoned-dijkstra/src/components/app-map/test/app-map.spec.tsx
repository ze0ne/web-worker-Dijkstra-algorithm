import { newSpecPage } from '@stencil/core/testing';
import { AppMap } from '../app-map';

describe('app-map', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppMap],
      html: `<app-map></app-map>`,
    });
    expect(page.root).toEqualHtml(`
      <app-map>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-map>
    `);
  });
});
