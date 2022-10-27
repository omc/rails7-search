/* eslint-disable no-setter-return */

/**
 * @module center-l
 * @description
 * A custom element for centering a block-level element horizontally,
 * with a max-width value representing the typographic measure
 * @property {string} max=var(--measure) A CSS `max-width` value
 * @property {boolean} andText=false Center align the text too (`text-align: center`)
 * @property {boolean} gutters=0 The minimum space on either side of the content
 * @property {boolean} intrinsic=false Center child elements based on their content width
 */
export default class Center extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Center-${[
        this.max,
        this.andText,
        this.gutters,
        this.intrinsic,
      ].join("")}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement("style");
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            max-width: ${this.max};
            ${
              this.gutters
                ? `
            padding-left: ${this.gutters};
            padding-right: ${this.gutters};`
                : ""
            }
            ${this.andText ? `text-align: center;` : ""}
            ${
              this.intrinsic
                ? `
            display: flex;
            flex-direction: column;
            align-items: center;`
                : ""
            }
          }
        `
          .replace(/\s\s+/g, " ")
          .trim();
        document.head.appendChild(styleEl);
      }
    };
  }

  get max() {
    return this.getAttribute("max") || "var(--measure)";
  }

  set max(val) {
    return this.setAttribute("max", val);
  }

  get andText() {
    return this.hasAttribute("andText");
  }

  set andText(val) {
    if (val) {
      return this.setAttribute("andText", "");
    } else {
      return this.removeAttribute("andText");
    }
  }

  get gutters() {
    return this.getAttribute("gutters") || null;
  }

  set gutters(val) {
    return this.setAttribute("gutters", val);
  }

  get intrinsic() {
    return this.hasAttribute("intrinsic");
  }

  set intrinsic(val) {
    if (val) {
      return this.setAttribute("intrinsic", "");
    } else {
      return this.removeAttribute("intrinsic");
    }
  }

  static get observedAttributes() {
    return ["max", "andText", "gutters", "intrinsic"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  customElements.define("center-l", Center);
}
