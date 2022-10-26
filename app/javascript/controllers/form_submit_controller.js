import { ApplicationController, useDebounce } from 'stimulus-use'

// TODO
// debounce submissions
  //  https://turbo.hotwired.dev/handbook/drive#form-submissions
// disable inputs for other things (within frame) while request is in flight

export default class extends ApplicationController {
  static debounces = ['change'];

  connect() {
    useDebounce(this)
  }
  /**
   * Handles any change detected in the form, and then requests it to Rails.
   *  It locates the nearest form element to submit.
   *  This can also just be the event.target, if the data-controller is set
   *  on the form el itself.
   *
   * @param {InputEvent} event - a dom event, fired from changing a form input
   * @return {void}
   */
  change(event) {
    console.log(event);
    let formEl = event.target.closest('form');
    formEl.requestSubmit();
  }
}
