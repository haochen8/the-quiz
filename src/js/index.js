/**
 * The main script file of the application.
 *
 * @author // Hao Chen <hc222ig.student.lnu.se>
 * @version 1.1.0
 */

const quizApp = document.querySelector('quiz-application')
const nicknameForm = document.querySelector('nickname-form')
const highScoreList = document.querySelector('high-score-list')

nicknameForm.addEventListener('nickname-submitted', (event) => {
  // Hide the nickname form
  nicknameForm.style.display = 'none'
  // Hide the high score list
  highScoreList.style.display = 'none'
  // Show the quiz application
  quizApp.style.display = 'block'
})

quizApp.addEventListener('game-over', (event) => {
  // Hide the quiz application
  quizApp.style.display = 'none'
  // Show the high score list
  highScoreList.style.display = 'block'
})

quizApp.addEventListener('game-completed', (event) => {
  // Hide the quiz application
  quizApp.style.display = 'none'
  // Show the high score list
  highScoreList.style.display = 'block'
})

highScoreList.addEventListener('try-again-clicked', (event) => {
  // Hide the high score list
  highScoreList.style.display = 'none'
  // Show the quiz application
  quizApp.startQuiz()
})
