import { ApplicationController, useDebounce } from 'stimulus-use';
import { get } from "@rails/request.js";

export default class extends ApplicationController {

  static targets = [ "input", "results" ];
  static debounces = [ "change" ];

  connect() {
    useDebounce(this);
  }

  /**
   * Handles change to the search input
   * sends request to rails
   *
   * @param {InputEvent} event - the change event fired from the search input
   * @return {void}
   */
  change(event) {
    let query = event.target.value;
    let target = this.resultsTarget.id;

    if (query !== "") {
      get(`/books/search?q=${query}&target=${target}`, {
        responseKind: "turbo-stream",
      });
    } else {
      this.resultsTarget.innerHTML = "";
    }
  }
}
