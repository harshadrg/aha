# Aha! OTT Clone

A full-stack replica of the Aha OTT streaming platform featuring a modern, responsive UI built with React and Tailwind CSS, powered by a Node.js/Express and MongoDB backend.

## 🚀 Tech Stack

### Frontend (Client)
- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4 (Custom dark theme out of the box)
- **Data Fetching:** Custom `useFetch` hook wrapping Axios API calls
- **Key Components:**
  - `HeroBanner`: Auto-playing carousel for featured content.
  - `ContentRow`: Smooth horizontal scrolling tracks with PosterCards.
  - `PosterCard` / `BannerCard`: Interactive media components with dynamic hover states (lift + scale + drop shadow).

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Utilities:** CORS, dotenv for environment configuration
- **Seeding:** Built-in massive data seeder (`seed/seed.js`) generating 45+ realistic Telugu and Hindi movies/shows.

---

## 📂 Project Structure

```text
/
├── client/                 # Frontend React application
│   ├── public/             # Static assets (logos, etc.)
│   ├── src/
│   │   ├── api/            # Axios interceptors/config (`apiClient`)
│   │   ├── components/     # Reusable UI fragments (Buttons, Icons, Cards, Rows)
│   │   ├── hooks/          # Custom hooks (`useFetch`)
│   │   ├── pages/          # View routes: Home, Movies, Collections, Details
│   │   ├── App.jsx         # Main React Router configuration (`createBrowserRouter`)
│   │   └── main.jsx        # Entry point
│   ├── index.css           # Global stylesheet & Tailwind directives
│   └── package.json        
│
├── server/                 # Backend Express application
│   ├── config/             # DB connection logic (`db.js`)
│   ├── controllers/        # Route logic (`contentController`, `menuController`)
│   ├── models/             # Mongoose schemas (`Content.js`, `Menu.js`)
│   ├── routes/             # API routing
│   ├── seed/               # Database seeding scripts (`seed.js`)
│   ├── server.js           # Main Express server entry point
│   └── package.json        
│
└── .gitignore              # Git ignore rules for both client/server
```

---

## 🛠️ Installation & Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/harshadrg/aha.git
cd aha
```

### 2. Configure Environment Variables
**In `server/`**, create a `.env` file with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

**In `client/`**, create a `.env` file mapping to your backend:
```env
VITE_API_URL=http://localhost:5000
```

### 3. Server Setup & Database Seeding
Navigate to the server directory, install dependencies, and populate your database with initial media items:

```bash
cd server
npm install
npm run seed  # Drops existing collections and seeds menus & ~45 content items
npm run dev   # Starts the Express backend on port 5000 in watch mode
```

### 4. Client Setup
Open a new terminal window, navigate to the client, install dependencies, and start the Vite development server:

```bash
cd client
npm install --legacy-peer-deps
npm run dev   # Starts the React frontend on port 5173
```

Navigate to `http://localhost:5173` in your browser to view the application!

---

## 🔥 Key Features & Pages

1. **Home Page (`/`)**: Displays the Hero Carousel, injected promotional banners, and multiple horizontal scrolling sections (Trending, Latest Movies) using a specialized `ContentRow` wrapper.
2. **Movies Page (`/movies`)**: Uses a bypassed generic `/api/collections` endpoint to pull every movie in the database into an infinitely scaling responsive CSS grid.
3. **Collections Page (`/collection/:id`)**: Generic landscape-card layout built specifically for viewing categories (e.g., "Trending Now", "Binge-Worthy Shows").
4. **Details Page (`/details/:id`)**: Renders full metadata (Title, Year, Duration, Rating, Cast, Synopsis) and backdrop imagery for a single media click-through.
5. **Interactive Navbar**: Transparent, responsive navigation bar with a mobile-friendly hamburger menu overlay.
