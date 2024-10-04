/**
 * The countdown-timer web component module.
 *
 * @author // Hao Chen <hc222ig@student.lnu.se>
 * @version 1.1.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  :host {
    display: block;
    padding: 16px;
  }
  #countdown-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    height: 100;
    background-color: burlywood;
    font-size: 1em;
  }
</style>
<div id="countdown-container">
  
</div>
`
// Define custom element.
customElements.define('countdown-timer',
/**
 * Represents a countdown-timer element.
 */
  class extends HTMLElement {
    /**
     * The current timer.
     *
     * @type {*}
     */
    #timeLeft
    /**
     * The current timer ID.
     *
     * @type {*}
     */
    #timerID
    /**
     * The current timer display.
     *
     * @type {*}
     */
    #timerDisplay
    /**
     * Creates an instance of countdown-timer component.
     */
    constructor () {
      super()
      // Attach a shadow root to the element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      // Get the countdown container, timer display and set the time left.
      this.#timerDisplay = this.shadowRoot.getElementById('countdown-container')
      this.#timeLeft = 20
    }

    /**
     * Called after the element has been inserted into the DOM.
     */
    connectedCallback () {
      this.startTimer()
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.stopTimer()
      clearInterval(this.#timerID)
    }

    /**
     * Set the time limit.
     *
     * @param {number} timeLimit - The time limit.
     */
    setTimeLimit (timeLimit) {
      if (typeof timeLimit === 'number' && timeLimit > 0) {
        this.#timeLeft = timeLimit
      } else {
        console.error('Invalid time limit provided:', timeLimit)
      }
    }

    /**
     * Get the time left.
     *
     * @returns {number} - The time left.
     */
    getTimeLeft () {
      return this.#timeLeft
    }

    /**
     * Start the timer.
     */
    startTimer () {
      // Clear the timer if it is already running.
      if (this.#timerID) {
        clearInterval(this.#timerID)
      }
      // Set the timer display
      this.#timerDisplay.textContent = `Time left: ${this.#timeLeft} seconds`
      // Start the timer.
      this.#timerID = setInterval(() => {
        this.#timeLeft--
        this.#timerDisplay.textContent = `Time left: ${this.#timeLeft} seconds`
        // When time runs out
        if (this.#timeLeft <= 0) {
          this.stopTimer()
          this.dispatchEvent(new window.CustomEvent('time-up', {
            bubbles: true,
            composed: true
          }))
        }
      }, 1000)
    }

    /**
     * Stop the timer.
     */
    stopTimer () {
      clearInterval(this.#timerID)
      this.#timerID = null
    }

    /**
     * Reset the timer.
     */
    resetTimer () {
      this.stopTimer()
      this.startTimer()
    }
  })
