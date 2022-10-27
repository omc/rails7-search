/* eslint-disable no-setter-return */

/**
 * @module imposter-l
 * @description
 * A custom element to be positioned absolutely over any element
 * @property {boolean} breakout=false Whether the element is allowed to break out of the container over which it is positioned
 * @property {string} margin=0 The minimum space between the element and the inside edges of the positioning container over which it is placed (where `breakout` is not applied)
  * @property {boolean} fixed=false Whether to position the element relative to the viewport
 */
 export default class Imposter extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Imposter-${[this.breakout, this.fixed, this.margin].join('')}`;
      this.dataset.i = this.i;
      let margin = this.margin === '0' ? '0px' : this.margin;
      if (!document.getElementById(this.i) && (!this.breakout || this.fixed)) {
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            ${!this.breakout ? `
              max-inline-size: calc(100% - (${margin} * 2));
              max-block-size: calc(100% - (${margin} * 2));
              overflow: auto;`
            : ''}
            ${this.fixed ? `
              position: fixed;`
            : ''}
          }
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  get breakout() {
    return this.hasAttribute('breakout');
  }

  set breakout(val) {
    if (val) {
      return this.setAttribute('breakout', '');
    } else {
      return this.removeAttribute('breakout');
    }
  }

  get fixed() {
    return this.hasAttribute('fixed');
  }

  set fixed(val) {
    if (val) {
      return this.setAttribute('fixed', '');
    } else {
      return this.removeAttribute('fixed');
    }
  }

  get margin() {
    return this.getAttribute('margin') || '0px';
  }

  set margin(val) {
    return this.setAttribute('margin', val);
  }

  static get observedAttributes() {
    return ['breakout', 'margin', 'fixed'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('imposter-l', Imposter);
}
