/* eslint-disable no-setter-return */

/**
 * @module cluster-l
 * @description
 * A custom element for grouping items, with control over the margin between them
 * @property {string} justify=center A CSS `justify-content` value (start, center, space-between, space-around, space-evenly)
 * @property {string} align=center A CSS `align-items` value (stretch, center, start, end)
 * @property {string} space=var(--s1) A CSS `margin` value. The minimum space between the clustered child elements.
 * @property {string} wrap=wrap A CSS `flex-wrap` value.
 */
export default class Cluster extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Cluster-${[this.justify, this.align, this.space, this.wrap].join("")}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        document.head.innerHTML += `
        <style id="${this.i}">
          [data-i="${this.i}"] > * {
            flex-wrap: ${this.wrap};
            justify-content: ${this.justify};
            align-items: ${this.align};
            margin: calc(${this.space} / 2 * -1);
          }

          [data-i="${this.i}"] > * > * {
            margin: calc(${this.space} / 2);
          }
        </style>
        `
          .replace(/\s\s+/g, " ")
          .trim();
      }
    };
  }

  get justify() {
    return this.getAttribute("justify") || "center";
  }

  set justify(val) {
    return this.setAttribute("justify", val);
  }

  get wrap() {
    return this.getAttribute("wrap") || "wrap";
  }

  set wrap(val) {
    return this.setAttribute("wrap", val);
  }

  get align() {
    return this.getAttribute("align") || "center";
  }

  set align(val) {
    return this.setAttribute("align", val);
  }

  get space() {
    return this.getAttribute("space") || "var(--s1)";
  }

  set space(val) {
    return this.setAttribute("space", val);
  }

  static get observedAttributes() {
    return ["justify", "align", "space", "wrap"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  customElements.define("cluster-l", Cluster);
}
