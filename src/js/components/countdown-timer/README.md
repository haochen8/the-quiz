README for Countdown-Timer Web Component
Overview

The countdown-timer is a custom web component designed for displaying a simple countdown timer. It is a flexible and easy-to-use component that can be integrated into any web application.
Features

    Countdown Functionality: Countdown from a specified time.
    Custom Events: Support for custom events like start, stop, and reset.
    Style Customization: Customizable CSS for personal styling preferences.
    Shadow DOM: Encapsulation using Shadow DOM.

Installation

Include the JavaScript file for the countdown-timer component in your project.

html

<script src="path/to/countdown-timer.js"></script>

Usage

After including the script, you can use the countdown-timer element anywhere in your HTML.

html

<countdown-timer></countdown-timer>

API
Properties

    timeLeft: Represents the current time left on the timer.

Methods

    startTimer(): Starts the countdown.
    stopTimer(): Stops the countdown and resets the timer.
    resetTimer(): Resets the timer to its initial state and starts the countdown.
    getTimeLeft(): Returns the current time left on the timer.

Events

    time-up: Dispatched when the countdown reaches zero.

CSS Custom Properties

    --countdown-timer-background: Background color of the timer.
    --countdown-timer-font-size: Font size of the timer text.

Example

Here's a simple example of how to use the countdown-timer component:

html

<countdown-timer></countdown-timer>

<script>
  const timer = document.querySelector('countdown-timer')

  // Start the timer
  timer.startTimer()

  // Listen for the time-up event
  timer.addEventListener('time-up', () => {
    console.log('Countdown finished!')
  })
</script>

Browser Compatibility

This component is compatible with modern web browsers that support custom elements and Shadow DOM.
Author

Hao Chen - hc222ig@student.lnu.se
Version

1.1.0