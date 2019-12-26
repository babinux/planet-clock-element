import { html, fixture, expect } from '@open-wc/testing';

import '../planet-clock-element.js';

describe('PlanetClockElement', () => {
  it('has a default color is "blue" and posterDate is "1 Dec 2019" ', async () => {
    const el = await fixture(html`
      <planet-clock-element></planet-clock-element>
    `);

    expect(el.title).to.equal('Hey there');
    // expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture(html`
      <planet-clock-element></planet-clock-element>
    `);
    // el.shadowRoot.querySelector('button').click();

    // expect(el.counter).to.equal(6);
  });

  it('can override the color via attribute', async () => {
    const el = await fixture(html`
      <planet-clock-element color="orange"></planet-clock-element>
    `);

    expect(el.color).to.equal('orange');
  });

  it('shows initially the color "blue" and an ****"increment" button****', async () => {
    const el = await fixture(html`
      <planet-clock-element></planet-clock-element>
    `);

    expect(el).shadowDom.to.equalSnapshot();
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`
      <planet-clock-element></planet-clock-element>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
