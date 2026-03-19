# Content Repurp

An AI-powered content repurposing SaaS application. Transform your content for any platform (Twitter, LinkedIn, Instagram, Blog, Email, Facebook) with a single click using OpenRouter AI.

## Tech Stack

**Frontend:** React 18, Tailwind CSS 3, React Router, Axios, React Icons  
**Backend:** Node.js, Express, MongoDB (Mongoose), OpenRouter API, JWT Authentication, bcrypt

## Project Structure

```
contentRepurp/
├── client/          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Navbar, InputForm, OutputCard
│   │   ├── pages/         # Login, Dashboard
│   │   ├── services/      # API service (Axios)
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── server/          # Express backend
│   ├── config/      # DB & OpenRouter config
│   ├── controllers/ # Auth & Content controllers
│   ├── middleware/   # JWT auth middleware
│   ├── models/      # User & Content models
│   ├── routes/      # Auth & Content routes
│   ├── .env
│   ├── package.json
│   └── server.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- OpenRouter API key

### 1. Setup Environment Variables

Edit `server/.env` and update:

```env
MONGO_URI=mongodb://localhost:27017/contentRepurp
JWT_SECRET=your_secure_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
PORT=5000
```

### 2. Install Dependencies

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 3. Run the Application

```bash
# Start backend (from server/)
npm run dev

# Start frontend (from client/)
npm start
```

The client runs on `http://localhost:3000` and the server on `http://localhost:5000`.

## API Endpoints

| Method | Endpoint                  | Access  | Description             |
|--------|---------------------------|---------|-------------------------|
| POST   | `/api/auth/register`      | Public  | Register a new user     |
| POST   | `/api/auth/login`         | Public  | Login & get JWT token   |
| GET    | `/api/auth/profile`       | Private | Get user profile        |
| POST   | `/api/content/repurpose`  | Private | Repurpose content (AI)  |
| GET    | `/api/content`            | Private | Get user's content      |
| DELETE | `/api/content/:id`        | Private | Delete content          |

## License

MIT
