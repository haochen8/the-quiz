Quiz Application

This is a simple quiz application where users can submit a nickname, complete a quiz, and see their score on a high score list. The app handles transitions between the nickname form, quiz interface, and high score display dynamically based on user interaction.

Features

	•	Nickname Submission: Users can submit a nickname before starting the quiz.
	•	Quiz Application: After submitting their nickname, users are taken to the quiz interface where they can answer questions.
	•	High Score List: Once the quiz is over, users can view their high scores and try again if desired.
	•	Dynamic Transitions: The application uses event listeners to control the visibility of different sections, ensuring a smooth user experience.

Application Flow

	1.	Nickname Submission:
	•	Users enter a nickname and submit the form.
	•	The nickname form and high score list are hidden, and the quiz interface is displayed.
	2.	Quiz:
	•	Users answer the questions in the quiz.
	•	When the quiz is completed or the game ends, the quiz interface is hidden, and the high score list is shown.
	3.	High Score:
	•	Users can see their high score and compare it to others.
	•	They can click “Try Again” to restart the quiz, which will hide the high score list and start the quiz again.

Event Handlers

	•	Nickname Submitted:
	•	Hides the nickname form and the high score list.
	•	Displays the quiz application.
	•	Game Over / Game Completed:
	•	Hides the quiz application and shows the high score list.
	•	Try Again Clicked:
	•	Hides the high score list and restarts the quiz.

Author

	•	Hao Chen
	•	Version: 1.1.0
	•	Contact: <hc222ig.student.lnu.se>

How to Use

	1.	Start the application by submitting a nickname.
	2.	Answer the quiz questions.
	3.	View your score on the high score list and try again if you wish!