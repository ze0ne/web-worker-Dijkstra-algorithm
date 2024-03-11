import { newE2EPage } from '@stencil/core/testing';

describe('app-map', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-map></app-map>');

    const element = await page.find('app-map');
    expect(element).toHaveClass('hydrated');
  });
});
