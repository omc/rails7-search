/* eslint-disable no-setter-return */

/**
 * @module box-l
 * @description
 * A custom element for generic boxes/containers
 * @property {string} padding=var(--s1) A CSS `padding` value
 * @property {string} borderWidth=var(--border-thin) A CSS `border-width` value
 * @property {boolean} invert=false Whether to apply an inverted theme. Only recommended for greyscale designs.
 */
export default class Box extends HTMLElement {
  constructor() {
    super();
    // TODO: deal with flashing rendering
    // border: ${this.borderWidth} solid;
    this.render = () => {
      this.i = `Box-${[this.padding, this.borderWidth, this.invert].join("")}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        document.head.innerHTML += `
        <style id="${this.i}">
          [data-i="${this.i}"] {
            padding: ${this.padding};

            ${
              this.invert
                ? `background-color: var(--color-light);
              filter: invert(100%);`
                : ""
            }
          }

          [data-i="${this.i}"] {
            // background-color: inherit;
          }
        </style>
        `
          .replace(/\s\s+/g, " ")
          .trim();
      }
    };
  }

  get padding() {
    return this.getAttribute("padding") || "var(--s0)";
  }

  set padding(val) {
    return this.setAttribute("padding", val);
  }

  get borderWidth() {
    return this.getAttribute("borderWidth") || "0";
  }

  set borderWidth(val) {
    return this.setAttribute("borderWidth", val);
  }

  static get observedAttributes() {
    return ["borderWidth", "padding", "invert"];
  }

  get invert() {
    return this.hasAttribute("invert");
  }

  set invert(val) {
    if (val) {
      return this.setAttribute("invert", "");
    } else {
      return this.removeAttribute("invert");
    }
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  customElements.define("box-l", Box);
}
