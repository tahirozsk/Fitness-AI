require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Required for frontend to communicate with backend

const app = express();
const PORT = process.env.PORT || 3000; // Use port 3000 by default, or one specified in .env

// Middleware
app.use(express.json()); // To parse JSON request bodies
// IMPORTANT: Replace with the actual origin of your frontend!
// For local file testing with Live Server, 'http://127.0.0.1:5500' is common.
// For direct file access, you might temporarily use origin: '*' but NEVER in production.
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// --- Nodemailer Transporter Setup ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// --- User Data Storage (Simple JSON file for demo) ---
const userDataPath = path.join(__dirname, 'users.json');

// Function to read user data
function readUserData() {
    if (fs.existsSync(userDataPath)) {
        try {
            const data = fs.readFileSync(userDataPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading user data:', error);
            return {};
        }
    }
    return {};
}

// Function to write user data
function writeUserData(data) {
    try {
        fs.writeFileSync(userDataPath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing user data:', error);
    }
}

// --- API Endpoints ---

// Endpoint to set up a reminder (saves email to users.json)
app.post('/api/set-reminder', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    const users = readUserData();
    users[email] = { email: email, lastReminderSent: users[email]?.lastReminderSent || null }; // Preserve lastReminderSent if exists
    writeUserData(users);

    res.status(200).json({ message: 'Email reminder set up successfully! You will receive weekly reminders.' });
});

// Function to send reminder email
async function sendReminderEmail(email) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Weekly Fitness AI Reminder!',
        text: 'Time to check your fitness goals and update your profile on Fitness AI! Keep up the great work!'
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Reminder email sent to ${email}`);
        return true;
    } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
        return false;
    }
}

// --- Cron Job for Weekly Reminders ---
// This cron job will run every 5 minutes to check for users who need a reminder.
cron.schedule('*/5 * * * *', async () => { // Runs every 5 minutes
    console.log('Running 5-minute reminder check...');
    const users = readUserData();
    const now = new Date();

    for (const email in users) {
        const user = users[email];
        // Ensure email exists in user object. If not, it's an invalid entry, skip.
        if (!user || !user.email) {
            console.warn(`Skipping invalid user entry: ${JSON.stringify(user)}`);
            continue;
        }

        const lastSent = user.lastReminderSent ? new Date(user.lastReminderSent) : null;

        let shouldSend = false;
        // Check if lastSent is null or if 5 minutes have passed since last reminder
        if (!lastSent || (now.getTime() - lastSent.getTime()) / (1000 * 60) >= 5) {
            shouldSend = true;
        }

        if (shouldSend) {
            const sent = await sendReminderEmail(user.email); // Use user.email for robustness
            if (sent) {
                users[email].lastReminderSent = now.toISOString();
                writeUserData(users); // Update the last sent date
            }
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
