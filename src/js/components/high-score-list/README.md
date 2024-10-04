README for High-Score-List Web Component
Overview

The high-score-list is a custom web component designed to display high scores in web applications, particularly suitable for quiz or game applications. It provides an easy way to showcase top performers in a user-friendly manner.
Features

    Display High Scores: Shows a list of top scores with names and times.
    Dynamic Update: Updates the high score list in real-time as new scores are achieved.
    Local Storage: Utilizes local storage to persist high scores between sessions.
    Custom Events: Supports events like game completion and game over.

Installation

Include the JavaScript file for the high-score-list component in your project.

html

<script src="path/to/high-score-list.js"></script>

Usage

After including the script, you can use the high-score-list element anywhere in your HTML.

html

<high-score-list></high-score-list>

API
Methods

    updateHighScoreList(name, totalTime): Updates the high score list with a new score.
    getHighScores(): Retrieves high scores from local storage.
    showHighScoreList(): Displays the high score list on the screen.

Events

    try-again-clicked: Dispatched when the 'Try Again' button is clicked.

CSS Custom Properties

    --high-score-list-background: Background color of the high score list.
    --high-score-list-font-size: Font size of the high score list text.

Example

Here's a simple example of how to use the high-score-list component:

html

<high-score-list></high-score-list>

<script>
  const highScoreList = document.querySelector('high-score-list')

  // Listen for the try-again-clicked event
  highScoreList.addEventListener('try-again-clicked', () => {
    console.log('Try Again button clicked')
    // Restart the quiz or game
  });

  // Update high score list
  highScoreList.updateHighScoreList('Player1', 120)
</script>

Browser Compatibility

This component is compatible with modern web browsers that support custom elements and Shadow DOM.
Author

Hao Chen - hc222ig@student.lnu.se
Version

1.1.0