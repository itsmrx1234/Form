
```markdown
# Senator

A secure, scalable, full-stack authentication system built with React, Node.js, Express, and MongoDB. This project delivers user signup, login, JWT-based authentication, cookie management, and role-based protected routes with a clean, modular codebase.

---

## Features

- User registration and login with bcrypt-hashed passwords
- JWT authentication with secure HTTP-only cookies
- Session management with token expiration
- Middleware for protecting routes based on authentication state
- React Context for global auth state management
- Responsive, accessible UI styled with Tailwind CSS
- API integration with Axios, supporting credentials/cookies
- Clean, modular, and maintainable fucking code

---

## Technologies Used

### Frontend
- React.js with React Router and React Hook Form
- Tailwind CSS for sleek-ass styling
- Axios for HTTP requests

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- bcrypt for password hashing
- jsonwebtoken for JWT generation and verification
- cookie-parser for handling cookies

### Development
- ESLint & Prettier for code quality
- dotenv for environment variable management

---

## Getting Started

### Prerequisites
- Node.js v14+ installed
- MongoDB Atlas account or local MongoDB server
- Yarn or npm (pick your poison)

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/senator.git
   cd senator
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the `backend` folder with these variables:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_badass_secret_key
   ```

4. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

5. Start the development servers:
   ```bash
   # Backend (in one terminal)
   cd backend
   npm run dev

   # Frontend (in another terminal)
   cd ../frontend
   npm start
   ```

6. Open your browser and visit `http://localhost:3000` for the backend API and `http://localhost:3001` (or your React dev server port) for the frontend.

---

## Usage

- Register a new user on the Sign Up page.
- Log in with existing credentials.
- After login, a JWT token is stored in a secure HTTP-only cookie.
- Access protected routes; logout clears the token.
- The UI dynamically updates based on login status via React Context.

---

## Folder Structure

```
senator/
├── backend/          # Express server, API routes, models, controllers
├── frontend/         # React app source code (components, context, pages)
├── public/           # Static assets
├── .env             # Environment variables (not committed)
└── README.md        # This fucking awesome documentation
```

---

## API Endpoints

| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
| POST   | `/user/signup`     | Create a new user                    |
| POST   | `/user/login`      | Authenticate user & set cookie       |
| GET    | `/user/me`         | Check logged-in status               |
| POST   | `/user/logout`     | Clear authentication cookie          |

---

## Security Considerations

- Passwords are hashed with bcrypt before storage.
- JWT tokens are signed with a secret and expire after 1 hour.
- Cookies are HTTP-only, Secure, and SameSite=Strict for safe cross-site usage.
- Server verifies JWT tokens on every protected API request.

---

## Contributing

Contributions are welcome as fuck! Open an issue or submit a pull request with improvements or bug fixes.

---

## License

This project is licensed under the MIT License.

---

## Contact

Created by [Your Name] - hit me up at your.email@example.com for any badass queries.
