/**
 * The high-score-list web component module.
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
  #high-score-list-container {
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
<div id="high-score-list-container">
  <h1>High Score List</h1>
  <h2>Names and seconds for the five quickest tries</h2>
  <ol id="high-score-list"></ol>
  <button id="try-again">Try Again</button>
</div>
`
// Define custom element.
customElements.define('high-score-list',

  /**
   * Represents a high-score-list element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of high-score-list component.
     */
    constructor () {
      super()
      // Attach a shadow DOM tree to this element and append the template.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.boundHandleGameCompleted = this.handleGameCompleted.bind(this)
      this.boundHandleGameOver = this.handleGameOver.bind(this)
      this.boundHandleTryAgain = this.handleTryAgain.bind(this)
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      window.addEventListener('game-completed', this.handleGameCompleted.bind(this))
      window.addEventListener('game-over', this.handleGameOver.bind(this))
      const tryAgainButton = this.shadowRoot.querySelector('#try-again')
      tryAgainButton.addEventListener('click', this.boundHandleTryAgain)

      window.addEventListener('start-quiz', (event) => {
        this.style.display = 'none'
      })
    }

    /**
     * Handle try again button.
     */
    handleTryAgain () {
      // Dispatch an event to hide this component
      this.dispatchEvent(new CustomEvent('try-again-clicked', {
        bubbles: true,
        composed: true
      }))
    }

    /**
     * Handle game completed.
     *
     * @param {Event} event - The event.
     */
    handleGameCompleted (event) {
      const { nickname, totalTime } = event.detail
      this.updateHighScoreList(nickname, totalTime)
      this.showHighScoreList()
    }

    /**
     * Handle game over.
     *
     * @param {Event} event - The event.
     */
    handleGameOver (event) {
      const { nickname, totalTime } = event.detail
      this.showHighScoreList(nickname, totalTime)
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      window.removeEventListener('game-completed', this.handleGameCompleted.bind(this))
      window.removeEventListener('game-over', this.handleGameOver.bind(this))

      const tryAgainButton = this.shadowRoot.querySelector('#try-again')
      tryAgainButton.removeEventListener('click', this.boundHandleTryAgain)
    }

    /**
     * Update the high score list.
     *
     * @param {string} name - The name of the player.
     * @param {number} totalTime - The total time.
     */
    updateHighScoreList (name, totalTime) {
      const highScores = this.getHighScores()

      // Check if the player already has an entry in the high scores
      const existingPlayer = highScores.findIndex(score => score.name === name)

      if (existingPlayer !== -1) {
        // Update the existing entry if the new totalTime is better
        if (highScores[existingPlayer].totalTime > totalTime) {
          highScores[existingPlayer].totalTime = totalTime
        }
      } else {
        // Add a new entry if the player doesn't already have one
        highScores.push({ name, totalTime })
      }

      // Sort the high scores and keep the top 5.
      highScores.sort((a, b) => a.totalTime - b.totalTime)
      highScores.splice(5)

      // Save the high scores.
      localStorage.setItem('highScores', JSON.stringify(highScores))
      this.showHighScoreList(highScores)
    }

    /**
     * Get the high scores.
     *
     * @returns {[]} - The high scores.
     */
    getHighScores () {
      return JSON.parse(localStorage.getItem('highScores')) || []
    }

    /**
     * Show the high score list.
     *
     */
    showHighScoreList () {
      const highScores = this.getHighScores()
      const highScoreList = this.shadowRoot.querySelector('#high-score-list')

      highScoreList.innerHTML = ''
      highScores.forEach((highScore) => {
        const li = document.createElement('li')
        li.textContent = `${highScore.name} - ${highScore.totalTime} seconds`
        highScoreList.appendChild(li)
      })
    }
  })
