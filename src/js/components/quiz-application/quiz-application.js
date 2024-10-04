/**
 * The quiz-application web component module.
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
 

</style>
<div id="question-container"></div>
`
// Define custom element.
customElements.define('quiz-application',

  /**
   * Represents a quiz-application element.
   */
  class extends HTMLElement {
    /**
     * The current question.
     *
     * @type {*}
     */
    #currentQuestion
    /**
     * The current question container.
     *
     * @type {*}
     */
    #questionContainer
    /**
     * The total time.
     *
     * @type {number}
     */
    #totalTime = 0
    /**
     * The last answer.
     *
     * @type {string}
     */
    #lastAnswer
    /**
     * The last response.
     *
     * @type {string}
     */
    #lastResponse
    /**
     * Creates an instance of the quiz-application component.
     */
    constructor () {
      super()
      // Attach a shadow DOM tree to this element and append the template.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.#totalTime = 0
      this.boundStartQuiz = this.startQuiz.bind(this)
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Get the current question, question container and score element.
      this.#questionContainer = this.shadowRoot.getElementById('question-container')
      // Create a timer element and append it to the shadow root.
      this.timerElement = document.createElement('countdown-timer')
      this.shadowRoot.appendChild(this.timerElement)
      this.timerElement.addEventListener('time-up', (event) => this.gameOver())

      window.addEventListener('nickname-submitted', this.handleNicknameSubmitted.bind(this))
      window.addEventListener('start-quiz-requested', this.boundStartQuiz)
    }

    /**
     * Handles the nickname submitted event.
     *
     * @param {Event} event - The nickname submitted event.
     */
    handleNicknameSubmitted (event) {
      // Store the received nickname
      this.nickname = event.detail.nickname
      this.startQuiz()
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      // Remove the event listener
      window.removeEventListener('nickname-submitted', this.handleNicknameSubmitted.bind(this))
      window.removeEventListener('start-quiz-requested', this.boundStartQuiz)
    }

    /**
     * Displays the quiz.
     */
    startQuiz () {
      this.#totalTime = 0
      this.style.display = 'block'
      this.#questionContainer.style.display = 'block'

      if (this.highScoreListElement) {
        this.highScoreListElement.style.display = 'none'
      }
      this.fetchQuestion('https://courselab.lnu.se/quiz/question/1')
    }

    /**
     * Gets the total time.
     *
     * @returns {number} - The total time.
     */
    getTotalTime () {
      return this.#totalTime
    }

    /**
     * Fetches the questions.
     *
     * @param {string} url - The url.
     */
    async fetchQuestion (url) {
      try {
        const response = await window.fetch(url)
        // Handle the error.
        if (!response.ok) {
          const responseBody = await response.json()
          console.error('Error response from server:', responseBody)
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const questionData = await response.json()
        // Setting timeLimit from 'limit'
        this.#currentQuestion = {
          ...questionData,
          timeLimit: parseInt(questionData.limit, 10)
        }

        // Convert 'limit' string to a number and
        // setting it to a time limit.
        if (!Number.isNaN(this.#currentQuestion.timeLimit) && this.#currentQuestion.timeLimit > 0) {
          this.timerElement.setTimeLimit(this.#currentQuestion.timeLimit)
        } else {
          console.log('Default time limit set to 20 seconds.')
          this.timerElement.setTimeLimit(20)
          this.#currentQuestion.timeLimit = 20
        }
        this.timerElement.resetTimer()
        this.#displayQuestion()
      } catch (error) {
        console.error('Fetch Error', error)
      }
    }

    /**
     * Displays the question.
     */
    #displayQuestion () {
      // Clear the question container.
      this.#questionContainer.textContent = ''
      // Create the style element.
      const style = document.createElement('style')
      style.textContent = `
      h1 {
        font-size: 2em;
        margin-bottom: 0.5em;
        color: black;
      }
      .question-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
      .input-container {
        width: 100%;
        display: flex;
        justify-content: center; /* Center align input/radio elements */
      }
      .input-container label {
        display: flex;
        align-items: center;
        margin: 0.5em;
      }
      input[type='text'], input[type='radio'] {
        margin: 0.5em;
      }
      .button-timer-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-left: 20px;
        width: 100%;
      }
      .timer-container {
        margin-top: 10px;
        text-align: right;
        color: red;
      }
      .text-question input {
        font-size: 1.2em;
        margin-bottom: 0.5em;
        padding: 0.5em;
        color: #333;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        width: auto;
      }
      .question-button {
        padding: 10px 20px;
        background-color: #5cb85c;
        color: white;
        border: none;
        border-radius: 10px;
        cursor: pointer;
      }
      .question-button:hover {
        background-color: #4cae4c;
        color: #333;
      }
      `
      // Append the style element to the question container.
      this.#questionContainer.appendChild(style)

      // Create the question text element.
      const questionTextElement = document.createElement('div')
      questionTextElement.classList.add('question-text')

      const questionHeading = document.createElement('h1')
      questionHeading.textContent = this.#currentQuestion.question
      questionTextElement.appendChild(questionHeading)

      // Create the form element.
      const form = document.createElement('form')
      form.classList.add('question-form')
      questionTextElement.appendChild(form)

      const inputContainer = document.createElement('div')
      inputContainer.classList.add('input-container')
      form.appendChild(inputContainer)

      // Create the Timer element.
      const timerContainer = document.createElement('div')
      timerContainer.classList.add('timer-container')
      // Ensure the timerElement is correctly referenced and appended.
      if (!this.timerElement) {
        this.timerElement = document.createElement('countdown-timer')
      }
      timerContainer.appendChild(this.timerElement)
      // Append the timer container to the question text element.
      questionTextElement.appendChild(timerContainer)

      // Create the submit button.
      const submitButton = document.createElement('button')
      submitButton.type = 'submit'
      submitButton.classList.add('question-button')
      submitButton.textContent = 'Submit Answer'
      form.appendChild(submitButton)

      // Question element based on the question type.
      if (this.#currentQuestion.alternatives) {
      // Handle a multiple choice question element.
        Object.keys(this.#currentQuestion.alternatives).forEach((key) => {
          const label = document.createElement('label')
          const radioButton = document.createElement('input')
          radioButton.type = 'radio'
          radioButton.name = 'answer'
          radioButton.value = key
          radioButton.required = true
          radioButton.classList.add('radio-button')
          label.appendChild(radioButton)
          // Create the label text.
          const labelText = document.createElement('span')
          labelText.classList.add('label-text')
          labelText.textContent = this.#currentQuestion.alternatives[key]
          label.appendChild(labelText)

          inputContainer.appendChild(label)
        })
      } else {
        // Handle a text question element.
        const input = document.createElement('input')
        input.type = 'text'
        input.name = 'answer'
        input.required = true
        inputContainer.appendChild(input)
      }
      this.#questionContainer.appendChild(questionTextElement)
      // Add event listener.
      form.addEventListener('submit', (event) => this.#handleSubmit(event))
    }

    /**
     * Handles the submit event.
     *
     * @param {Event} event - The submit event.
     * @returns {Promise} - The promise.
     */
    async #handleSubmit (event) {
      // Prevent default behaviour.
      event.preventDefault()
      // Get the answer from the form data.
      const formData = new FormData(event.target)
      const answer = formData.get('answer')
      // Validate the answer.
      if (typeof answer !== 'string' || answer.trim() === '') {
        console.error('Invalid answer')
        return
      }

      try {
        const response = await window.fetch(`${this.#currentQuestion.nextURL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ answer })
        })
        this.#lastResponse = response
        // Handles the loser.
        if (!response.ok) {
          this.gameOver()
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        this.#lastResponse = response
        this.#lastAnswer = result

        if (result.nextURL) {
          const timeSpent = this.#currentQuestion.timeLimit - this.timerElement.getTimeLeft()
          if (isNaN(timeSpent)) {
            console.error('timeSpent is NaN. Check the values and calculation.')
            return
          }
          this.#totalTime += timeSpent
          this.fetchQuestion(result.nextURL)
          this.timerElement.resetTimer()
        } else {
          // Handles the winner.
          if (this.correctLastAnswer()) {
            this.gameCompleted()
          }
        }
      } catch (error) {
        console.error('Submit error', error)
        if (error.response) {
          const responseBody = await error.response.json()
          console.error('Server response:', responseBody)
        }
      }
    }

    /**
     * Handles the last answer.
     *
     * @returns {boolean} - True if the last answer is correct, false otherwise.
     */
    correctLastAnswer () {
      if (this.#lastResponse.status === 400) {
        this.gameOver()
        return false
      }
      if (!this.#lastAnswer.nextURL) {
        this.gameCompleted()
        return true
      }
      return false
    }

    /**
     * When the game is over.
     *
     */
    gameOver () {
      // Stop the timer.
      this.timerElement.stopTimer()
      // Hide the question container.
      this.#questionContainer.style.display = 'none'
      // Dispatch an event to show the high score list.
      this.dispatchEvent(new window.CustomEvent('game-over', {
        detail: { nickname: this.nickname, totalTime: this.#totalTime },
        bubbles: true,
        composed: true
      }))
      // Show the high score list.
      if (this.highScoreListElement) {
        this.highScoreListElement.style.display = 'block'
      }
    }

    /**
     * When the game is completed.
     */
    gameCompleted () {
      // Stop the timer.
      this.timerElement.stopTimer()
      // Hide the question container.
      this.#questionContainer.style.display = 'none'
      // Dispatch an event to show the high score list.
      this.dispatchEvent(new window.CustomEvent('game-completed', {
        detail: { nickname: this.nickname, totalTime: this.#totalTime },
        bubbles: true,
        composed: true
      }))
      // Show the high score list.
      if (this.highScoreListElement) {
        this.highScoreListElement.style.display = 'block'
      }
    }
  }
)
