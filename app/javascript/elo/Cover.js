/* eslint-disable no-setter-return */

/**
 * @module cover-l
 * @description
 * A custom element for covering a block-level element horizontally,
 * with a max-width value representing the typographic measure
 * @property {string} centered=h1 A simple selector such an element or class selector, representing the centered (main) element in the cover
 * @property {string} space=var(--s1) The minimum space between and around all of the child elements
 * @property {string} minHeight=100vh The minimum height for the **Cover**
 * @property {boolean} noPad=false Whether the spacing is also applied as padding to the container element
 */
export default class Cover extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Cover-${[
        this.centered,
        this.space,
        this.minHeight,
        this.noPad,
      ].join("")}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        document.head.innerHTML += `
        <style id="${this.i}">
          [data-i="${this.i}"] {
            min-height: ${this.minHeight};
            padding: ${this.noPad ? '0' : this.space};
          }

          [data-i="${this.i}"] > * {
            margin-top: ${this.space};
            margin-bottom: ${this.space};
          }

          [data-i="${this.i}"] > :first-child:not(${this.centered}) {
            margin-top: 0;
          }

          [data-i="${this.i}"] > :last-child:not(${this.centered}) {
            margin-bottom: 0;
          }

          [data-i="${this.i}"] > ${this.centered} {
            margin-top: auto;
            margin-bottom: auto;
          }
        </style>
        `
          .replace(/\s\s+/g, " ")
          .trim();
      }
    };
  }

  get centered() {
    return this.getAttribute("centered") || "h1";
  }

  set centered(val) {
    return this.setAttribute("centered", val);
  }

  get space() {
    return this.getAttribute("space") || "var(--s1)";
  }

  set space(val) {
    return this.setAttribute("space", val);
  }

  get minHeight() {
    return this.getAttribute("minHeight") || "100vh";
  }

  set minHeight(val) {
    return this.setAttribute("minHeight", val);
  }

  get noPad() {
    return this.hasAttribute("noPad");
  }

  set noPad(val) {
    if (val) {
      return this.setAttribute("noPad", "");
    } else {
      return this.removeAttribute("noPad");
    }
  }

  static get observedAttributes() {
    return ["centered", "space", "minHeight", "noPad"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  customElements.define("cover-l", Cover);
}
