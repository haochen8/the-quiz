README for Nickname-Form Web Component
Overview

The nickname-form is a custom web component designed to capture a user's nickname in web applications, particularly for use in games or quizzes. It offers an intuitive and user-friendly interface for nickname entry.
Features

    Nickname Input: Provides a form for users to enter their nicknames.
    Validation: Ensures that the nickname meets specified criteria (e.g., minimum length).
    Custom Events: Supports custom events for handling nickname submission.
    Styling: Customizable CSS for adapting to various design themes.

Installation

Include the JavaScript file for the nickname-form component in your project.

html

<script src="path/to/nickname-form.js"></script>

Usage

After including the script, you can use the nickname-form element anywhere in your HTML.

html

<nickname-form></nickname-form>

API
Attributes

    nickname: The nickname entered by the user.

Events

    nickname-submitted: Dispatched when the user submits a valid nickname.

CSS Custom Properties

    --nickname-form-background: Background color of the form.
    --nickname-form-font-size: Font size of the form text.

Example

Here's a simple example of how to use the nickname-form component:

html

<nickname-form></nickname-form>

<script>
  const nicknameForm = document.querySelector('nickname-form')

  // Listen for the nickname-submitted event
  nicknameForm.addEventListener('nickname-submitted', (event) => {
    console.log('Nickname Submitted:', event.detail.nickname)
    // Start the game or quiz with the provided nickname
  })
</script>

Browser Compatibility

This component is compatible with modern web browsers that support custom elements and Shadow DOM.
Author

Hao Chen - hc222ig@student.lnu.se
Version

1.1.0