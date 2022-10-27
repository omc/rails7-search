/* eslint-disable no-setter-return */

/**
 * @module grid-l
 * @description
 * A custom element for creating a responsive grid using the CSS Grid module
 * @property {string} min=250px A CSS length value representing x in `minmax(min(x, 100%), 1fr)`
 * @property {string} space=var(--s0) The space between grid cells
 * @property {string} repeat=2 How many repeats. Number, or 'auto-fit', 'auto-fill'
 */
export default class Grid extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Grid-${[this.min, this.space].join("")}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        document.head.innerHTML += `
        <style id="${this.i}">
          [data-i="${this.i}"] {
            grid-gap: ${this.space};
          }

          [data-i="${this.i}"].grid-l--above {
            grid-template-columns: repeat(auto-fit, minmax(${this.min}, 1fr));
          }

          @supports (width: min(${this.min}, 100%)) {
            [data-i="${this.i}"] {
              grid-gap: ${this.space};
              grid-template-columns: repeat(${this.repeat}, minmax(min(${this.min}, 100%), 1fr));
            }
          }
        </style>
        `
          .replace(/\s\s+/g, " ")
          .trim();
      }
    };
  }

  get min() {
    return this.getAttribute("min") || "250px";
  }

  set min(val) {
    return this.setAttribute("min", val);
  }

  get space() {
    return this.getAttribute("space") || "var(--s1)";
  }

  set space(val) {
    return this.setAttribute("space", val);
  }

  get repeat() {
    return this.getAttribute("repeat") || "auto-fill";
  }

  set repeat(val) {
    return this.setAttribute("repeat", val);
  }

  static get observedAttributes() {
    return ["min", "space", "repeat"];
  }

  connectedCallback() {
    if (
      "ResizeObserver" in window &&
      !CSS.supports("width", `min(${this.min}, 100%)`)
    ) {
      const test = document.createElement("div");
      test.classList.add("test");
      test.style.width = this.min;
      this.appendChild(test);
      const br = test.offsetWidth;
      this.removeChild(test);

      const ro = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const cr = entry.contentRect;
          const q = cr.width > br;
          this.classList.toggle("grid-l--above", q);
        }
      });

      ro.observe(this);
    }
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  customElements.define("grid-l", Grid);
}
