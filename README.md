Fitness AI
Fitness AI is a web application designed to create personalized workout plans based on user preferences and track fitness progress. It includes features like weekly email reminders, an AI chatbot for fitness advice, and a YouTube video search for exercise tutorials. The backend is built with Node.js, Express, and Nodemailer, while the frontend uses HTML, CSS, and JavaScript.
Features

Personalized Workout Plans: Generate workout plans based on fitness level, goals, workout type, and weekly schedule.
Profile & Progress Tracking: Save user metrics (weight, body fat, muscle mass) and track progress over time.
Weekly Email Reminders: Receive automated weekly reminders to stay on track with fitness goals.
AI Fitness Chatbot: Interact with an AI-powered chatbot for fitness advice (requires integration with an AI service).
Exercise Video Search: Search YouTube for exercise videos to support workouts.
Responsive Design: User-friendly interface accessible on desktop and mobile devices.

Tech Stack

Backend: Node.js, Express, Nodemailer, node-cron
Frontend: HTML, CSS, JavaScript
Data Storage: JSON file (users.json) for user data
Environment Management: dotenv for configuration
Dependencies: Listed in package.json

Prerequisites

Node.js (v16 or higher)
npm (included with Node.js)
A Gmail account for sending email reminders (with an App Password if 2FA is enabled)

Setup Instructions

Clone the Repository
git clone https://github.com/your-username/fitness-ai.git
cd fitness-ai


Install Dependencies
npm install


Configure Environment Variables

Create a .env file in the root directory.
Add the following environment variables:EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3000


Note: To generate a Gmail App Password, enable 2FA on your Google account and create an App Password via Google Account Settings.


Run the Application

Start the backend server:npm start


Open index.html in a browser. If using a local development server (e.g., VS Code Live Server), ensure it runs on http://127.0.0.1:5500 to match the CORS configuration in server.js.



Usage

Home Page: Select fitness preferences (level, goal, workout type, days per week, gender) and describe health considerations to generate a workout plan.
My Self: Enter and save personal metrics (weight, body fat, muscle mass) and set up weekly email reminders by providing an email address.
AI Chat: Interact with the AI chatbot for fitness advice (requires integration with an AI service).
Video Search: Search YouTube for exercise videos to complement your workout plan.
Email Reminders: The backend sends reminders every 5 minutes for testing (configurable in server.js via node-cron). In production, adjust the cron schedule (e.g., weekly).

Project Structure
fitness-ai/
├── .env                # Environment variables (not tracked in Git)
├── users.json          # User data storage
├── package.json        # Project dependencies and metadata
├── server.js           # Backend server (Node.js/Express)
├── index.html          # Frontend interface
└── README.md           # Project documentation

Notes

CORS Configuration: The backend is configured to allow requests from http://127.0.0.1:5500. Update the cors origin in server.js to match your frontend's URL in production.
Security: Never commit the .env file to GitHub. Use a .gitignore file to exclude it.
Cron Schedule: The current cron job runs every 5 minutes for testing. For production, update the schedule in server.js (e.g., 0 0 * * 0 for weekly on Sundays).
AI Chatbot: The chatbot feature requires integration with an external AI service (not implemented in the provided code).
PDF Download: The "Download as PDF" feature requires additional implementation (e.g., using a library like jsPDF).

Contributing
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request with your changes.
License
This project is licensed under the MIT License.
Contact
For questions or support, contact your-email@example.com.
