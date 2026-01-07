A full-stack blog platform built with React, Node.js, Express, and PostgreSQL.

The app supports user authentication, public and private routes, and complete CRUD
operations on posts with proper ownership rules. Authenticated users can create,
edit, and delete their own posts, while all users can read published content.

Built as a learning-focused project to understand real-world full-stack workflows,
including API design, protected routes, frontend state management, and deployment readiness.

## Features

- User authentication (JWT-based)
- Public and protected routes
- Create, read, update, and delete posts
- Ownership-based access control
- Public post feed
- User dashboard for managing personal posts
- Clean REST API design
- Responsive UI with Tailwind CSS

## Tech Stack

Frontend:

- React
- React Router
- Axios
- Tailwind CSS

Backend:

- Node.js
- Express
- PostgreSQL
- JWT Authentication

Other:

- REST APIs
- Modular project structure

## Project Structure & Architecture Flow

This project follows a clear client → API → database flow.
The architecture is intentionally kept explicit to understand how authentication,
routing, and data ownership work end-to-end.

### Frontend (React)

User
↓
Browser
↓
React App (app and components are obvious, skim the repo and you'll get it)
├── pages (Landing, Home, Login, Register, Dashboard, Post, Create/Edit Post)
├── layouts
│ ├── PublicLayout (landing, public posts)
│ └── PrivateLayout (dashboard, post management)
├── contexts
│ ├── Stores authenticated user
│ ├── Calls /me on refresh
│ └── Exposes login, register, logout
├── services
│ ├── auth.services
│ ├── post.services
| └── axioso (Attaches JWT token via interceptor)
└── utils (rn just, timeago)

### API Communication

React Component
↓
Service Layer (auth.service.js, posts.service.js)
↓
Axios (with token if available)
↓
Backend API

### Backend (Express)

server.js

Routes
├── auth.routes.js
│ ├── POST /register
│ ├── POST /login
│ └── GET /me
└── post.routes.js
├── GET /posts
├── GET /posts/:id
├── GET /posts/me
├── POST /posts
├── PUT /posts/:id
└── DELETE /posts/:id

Middleware
└── authenticateToken
└── Verifies JWT
└── Attaches userId to request

Controllers
├── Auth Controller
└── Post Controller
└── Enforces ownership rules

Database (PostgreSQL)
├── users
└── posts

## Contributing

Contributions are welcome and appreciated.

If you want to contribute:

1. Fork the repository
2. Create a new branch from `main`
3. Make your changes
4. Open a Pull Request with a short explanation

### Good places to contribute

- UI/UX improvements
- Code cleanup or refactoring
- Error handling improvements
- Documentation
- New features (open an issue first)

If you're unsure about something, feel free to open an issue or start a discussion.

### Notes for Contributors

This project was built as a learning-focused full-stack app.
_Clarity and simplicity are preferred over clever abstractions._

If you're adding something:

- Please don't fix comments, they are for me mostly
- Keep changes small and focused
- Follow existing patterns (services → controllers → routes)
- Avoid introducing unnecessary dependencies

I'm happy to discuss ideas before implementation.

If you're learning full-stack development, feel free to explore and experiment with this codebase.
