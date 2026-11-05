# Joe Bank

A full-stack banking web app I built in 2024 during the MIT xPRO Professional Certificate in Full-Stack Development.

Users can create an account, log in, deposit and withdraw money from savings or checking accounts, deposit a cheque by taking a photo with their webcam, and see their balance and transaction history.

## Built with

- Frontend: React, React Router, Bootstrap, Axios
- Backend: Node.js, Express, MongoDB
- Login: JSON Web Tokens (JWT), with passwords hashed using bcrypt
- Docker Compose, with Nginx serving the frontend

## Security notes

I built this before starting my MSc in Cyber Security. Looking back at it now:

What it does well:
- Passwords are stored as bcrypt hashes, never as plain text.
- A wrong email and a wrong password get the same "Invalid Credentials" message, so the login page doesn't reveal which accounts exist.
- Form inputs are checked on the server before anything is saved.
- Private pages need a valid login token.

What I fixed (November 2026):
- The secret key used to sign login tokens was written directly in docker-compose.yml, so anyone could read it on GitHub. It now comes from an environment variable instead (see .env.example). The old key is still in the commit history, so it should be treated as exposed and never reused.

What I would improve next:
- Limit repeated login attempts to slow down password guessing.
- Shorten login sessions (tokens currently last 5 days).
- Add a username and password to MongoDB and stop exposing its port.
- Only accept requests from the app's own address (CORS) and add security headers.
