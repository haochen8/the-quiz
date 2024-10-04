README for Quiz-Application Web Component
Overview

The quiz-application is a custom web component designed to create interactive quiz experiences in web applications. It's an easy-to-integrate component that enhances user engagement through quizzes.
Features

    Dynamic Quiz Handling: Manages and displays quiz questions dynamically.
    Custom Events: Supports events like quiz start, game over, and game completion.
    Shadow DOM: Utilizes Shadow DOM for encapsulation.
    Timer Integration: Includes a countdown timer for each quiz question.

Installation

Include the JavaScript file for the quiz-application component in your project.

html

<script src="path/to/quiz-application.js"></script>

Usage

After including the script, you can use the quiz-application element anywhere in your HTML.

html

<quiz-application></quiz-application>

API
Properties

    totalTime: Represents the total time taken by the user to answer questions.

Methods

    startQuiz(): Initializes and starts the quiz.
    getTotalTime(): Returns the total time taken by the user.
    fetchQuestion(url): Fetches a question from the provided URL.
    gameOver(): Triggers when the user fails to answer correctly or time runs out.
    gameCompleted(): Triggers when the user successfully completes the quiz.

Events

    game-over: Dispatched when the game is over.
    game-completed: Dispatched when the game is completed successfully.

CSS Custom Properties

    --quiz-application-background: Background color of the quiz container.
    --quiz-application-font-size: Font size of the quiz text.

Example

Here's a simple example of how to use the quiz-application component:

html

<quiz-application></quiz-application>

<script>
  const quizApp = document.querySelector('quiz-application')

  // Listen for the game-over event
  quizApp.addEventListener('game-over', (event) => {
    console.log('Game Over', event.detail)
  });

  // Listen for the game-completed event
  quizApp.addEventListener('game-completed', (event) => {
    console.log('Congratulations! You completed the quiz!', event.detail)
  });

  // Start the quiz
  quizApp.startQuiz()
</script>

Browser Compatibility

This component is compatible with modern web browsers that support custom elements and Shadow DOM.
Author

Hao Chen - hc222ig@student.lnu.se
Version

1.1.0