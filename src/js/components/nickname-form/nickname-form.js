/**
 * The nickname-form web component module.
 *
 * @author // Hao Chen <hc222ig@student.lnu.se>
 * @version 1.1.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        width: 100%;
        height: 100%;
        background-color: burlywood;
        color: black;
        max-width: 500px;
    }
    h1 {
        color: black;
        font-size: 2,5em;
        margin-bottom: 0.5em;
    }
    label {
        font-size: 1.2em;
        margin-bottom: 0.5em;
    }
    input {
        font-size: 1.2em;
        margin-bottom: 0.5em;
        padding: 0.5em;
        color: #333;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        width: 100%;
    }
    button {
        margin-top: 10px;
        padding: 10px 20px;
        background-color: #5cb85c;
        color: white;
        border: none;
        border-radius: 10px;
        cursor: pointer;
    }
    button:hover {
        background-color: #4cae4c;
        color: #333;
    }
    .error-message {
        color: red;
        display: none;
    }
</style>
<form>
<h1>Welcome to the Quiz Game</h1>
      <label for="nickname"></label>
      <input type="text" id="nickname" name="nickname" required placeholder="Enter your nickname"
      autocomplete="off" autofocus>
      <span class="error-message" id="error-message"></span>
      <button type="submit">Start Quiz</button>
   </form> 
`

// Define custom element.
customElements.define('nickname-form',
  /**
   * Represents a nickname-form web component.
   */
  class extends HTMLElement {
    /**
     * Form element.
     *
     * @type {*} formElement - The form element.
     */
    #form
    /**
     * Nickname input element.
     *
     * @type {*} nicknameInputElement - The nickname input element.
     */
    #nicknameInput
    /**
     * Bound handle submit.
     *
     * @type {*}
     */
    #boundHandleSubmit
    /**
     * Bound handle input.
     *
     * @type {*}
     */
    #boundHandleInput
    /**
     * Creates an instance of nickname-form web component.
     */
    constructor () {
      super()
      // Attach a shadow root to the element and append the template.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      // Get the form element, nickname input element.
      this.#form = this.shadowRoot.querySelector('form')
      this.#nicknameInput = this.shadowRoot.querySelector('#nickname')
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['nickname']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (oldValue !== newValue &&
            this.#form.elements.namedItem(name).value !== newValue) {
        this.#form.elements.namedItem(name).value = newValue
      }
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      /**
       * Handles the submit event.
       *
       * @param {SubmitEvent} event - The submit event object.
       */
      this.#form.addEventListener('submit', this.#boundHandleSubmit = (event) => {
        // Prevent the form from being submitted.
        event.preventDefault(event)
        // Fire the nickname submitted event.
        this.#fireNicknameSubmit()
      })
      /**
       * Handles the input event.
       *
       * @param {InputEvent} event - The input event object.
       */
      this.#nicknameInput.addEventListener('input', this.#boundHandleInput = (event) => {
        // Prevent the form from being submitted.
        event.preventDefault(event)
        // Fire the nickname input event.
        this.#onInput(event)
      })
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.#form.removeEventListener('submit', this.#boundHandleSubmit)
      this.#form.removeEventListener('input', this.#boundHandleInput)
    }

    /**
     * Handles the submit event.
     *
     * @param {Event} event - The submit event.
     */
    #fireNicknameSubmit (event) {
      // Get the nickname value.
      const nickname = this.#nicknameInput.value.trim()
      // Get the error message element.
      const errorMessageElement = this.shadowRoot.querySelector('#error-message')
      // Validate the nickname.
      if (nickname.length >= 3) {
        // Set the nickname attribute.
        this.setAttribute('nickname', nickname)
        // Fire the nickname submitted event.
        this.dispatchEvent(new window.CustomEvent('nickname-submitted', {
          detail: { nickname: this.#nicknameInput.value },
          bubbles: true,
          composed: true
        }))
      } else {
        errorMessageElement.textContent = 'Nickname must be of atleast 3 character.'
        errorMessageElement.style.display = 'block'
      }
    }

    /**
     * Handles the input event.
     *
     * @param {Event} event - The input event.
     */
    #onInput (event) {
      // Get the nickname value.
      // Get the error message element.
      const errorMessageElement = this.shadowRoot.querySelector('#error-message')
      // Validate the nickname.
      if (errorMessageElement.style.display === 'block') {
        errorMessageElement.style.display = 'none'
      }
    }
  })
