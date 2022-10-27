/* eslint-disable no-setter-return */

/**
 * @module switcher-l
 * @description Switch directly between horizontal and vertical layouts at a given (container width-based) breakpoint or 'threshold'
 * @property {string} threshold=var(--measure) A CSS `width` value (representing the 'container breakpoint')
 * @property {string} space=var(--s1) A CSS `margin` value
 * @property {integer} limit=4 A number representing the maximum number of items permitted for a horizontal layout
 */
export default class Switcher extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Switcher-${[this.threshold, this.space, this.limit].join("")}`;
      this.dataset.i = this.i;
      this.adjustedSpace = this.space === "0" ? "0px" : this.space;
      if (!document.getElementById(this.i)) {
        document.head.innerHTML += `
          <style id="${this.i}">
            [data-i="${this.i}"] > * {
              margin: calc((${this.adjustedSpace} / 2) * -1);
            }

            [data-i="${this.i}"] > * > * {
              flex-basis: calc((${this.threshold} - (100% - ${
          this.adjustedSpace
        })) * 999);
              margin: calc(${this.adjustedSpace} / 2);
            }

            [data-i="${this.i}"] > * > :nth-last-child(n+${
          parseInt(this.limit) + 1
        }),
            [data-i="${this.i}"] > * > :nth-last-child(n+${
          parseInt(this.limit) + 1
        }) ~ * {
              flex-basis: 100%;
            }
          </style>
        `
          .replace(/\s\s+/g, " ")
          .trim();
      }
    };
  }
  get threshold() {
    return this.getAttribute("threshold") || "var(--measure)";
  }

  set threshold(val) {
    return this.setAttribute("threshold", val);
  }

  get space() {
    return this.getAttribute("space") || "var(--s1)";
  }

  set space(val) {
    return this.setAttribute("space", val);
  }

  get limit() {
    return this.getAttribute("limit") || "5";
  }

  set limit(val) {
    return this.getAttribute("limit", val);
  }

  static get observedAttributes() {
    return ["threshold", "space", "limit"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  customElements.define("switcher-l", Switcher);
}
