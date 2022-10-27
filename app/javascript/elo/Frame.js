/* eslint-disable no-setter-return */

/**
 * @module frame-l
 * @description
 * A custom element for augmenting image ratios
 * @property {string} ratio=6:9 The element's aspect ratio
 */
export default class Frame extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      if (!this.children.length < 1) {
        // eslint-disable-next-line no-console
        console.warn("<frame-l> elements should have just one child element");
      }
      this.i = `Frame-${[this.ratio].join("")}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        const ratio = this.ratio.split(":");
        document.head.innerHTML += `
        <style id="${this.i}">
          [data-i="${this.i}"] {
            padding-bottom: calc(${ratio[0]} / ${ratio[1]} * 100%);
          }
        </style>
        `
          .replace(/\s\s+/g, " ")
          .trim();
      }
    };
  }

  get ratio() {
    return this.getAttribute("ratio") || "6:9";
  }

  set ratio(val) {
    return this.setAttribute("ratio", val);
  }

  static get observedAttributes() {
    return ["ratio"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  customElements.define("frame-l", Frame);
}
