# Joe Bank

A full-stack banking web app I built in 2024 during the MIT xPRO Professional Certificate in Full-Stack Development.

Users can create an account, log in, deposit and withdraw money from savings or checking accounts, deposit a cheque by taking a photo with their webcam, and see their balance and transaction history.

## Built with

- Frontend: React, React Router, Bootstrap, Axios
- Backend: Node.js, Express, MongoDB
- Login: JSON Web Tokens (JWT), with passwords hashed using bcrypt
- Docker Compose, with Nginx serving the frontend and passing API requests to the backend

## Running it locally

You need Docker installed.

1. Copy .env.example to a new file called .env and set JWT_SECRET to a long random value, for example the output of: openssl rand -base64 32
2. Run: docker compose up --build
3. Open http://localhost:8080

## Security notes

I built this before starting my MSc in Cyber Security. Looking back at it now:

What it does well:
- Passwords are stored as bcrypt hashes, never as plain text.
- A wrong email and a wrong password get the same "Invalid Credentials" message, so the login page doesn't reveal which accounts exist.
- Form inputs are checked on the server before anything is saved.
- Private pages need a valid login token.

What I fixed (November 2026):
- The secret key used to sign login tokens was written directly in docker-compose.yml, so anyone could read it on GitHub. It now comes from an environment variable instead (see .env.example). The old key is still in the commit history, so it should be treated as exposed and never reused.
- The app now refuses to start if JWT_SECRET hasn't been set.
- The Docker setup didn't work. The website was sent to the wrong port, API requests went to the wrong address, and the database was told to load a config file that didn't exist. I fixed all three.
- Only the website is reachable from outside Docker now. The database and the API can only be reached inside Docker's private network.

What I would improve next:
- Limit repeated login attempts to slow down password guessing.
- Shorten login sessions (tokens currently last 5 days).
- Add a username and password to MongoDB.
- Only accept requests from the app's own address (CORS) and add security headers.
  - Moved both containers off end-of-life versions of Node.js (16 and 20) to Node.js 24, which gets security updates until April 2028.
