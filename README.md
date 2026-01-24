# 📖 BookCourier - The Ultimate Bookstore Ecosystem (Client)

![BookCourier Banner](./public/home-page.png)

BookCourier is a state-of-the-art, full-stack bookstore platform that bridges the gap between readers, librarians, and administrators. This repository contains the **Client-side** code, built with React 19 and Tailwind CSS 4, providing a premium, high-performance user interface.

## 🔗 Important Links

- 🌐 **Live Site**: [https://book-courier.vercel.app/](https://book-courier.vercel.app/)
- 💻 **Client-Side Repository**: [GitHub Repo](https://github.com/alhasandhali/book-courier-client-side.git)
- 🖥️ **Server-Side Repository**: [GitHub Repo](https://github.com/alhasandhali/book-courier-server-side.git)

---

## 🌟 Key Features

### 👤 User Roles & Workflows
- **User Dashboard**: Manage profiles, track orders, view wishlist, and process simulated payments.
- **Librarian Dashboard**: Comprehensive tools for adding books, managing stock, and updating return schedules.
- **Admin Dashboard**: Global user management, role assignment, and platform-wide analytics.

### 🎨 Design & UI
- **Premium Aesthetics**: Crafted with **Tailwind CSS 4** and **DaisyUI 5**.
- **Responsive Layouts**: Optimized for seamless experience across mobile, tablet, and desktop.
- **Micro-interactions**: Smooth carousels, maps, and toast notifications for enhanced UX.

---

## 📂 Project File Structure (Client-Side)

The frontend is built with a modular and scalable architecture:

```text
book-courier-client-side/
├── public/                  # Static assets (images, JSON data)
│   ├── home-page.png        # Main project banner
│   └── warehouses.json      # Map data for library locations
├── src/
│   ├── assets/              # Standard assets like SVGs or local images
│   ├── components/          # Reusable UI components
│   │   ├── BestSellers/     # Best selling books slider/grid
│   │   ├── BookCard/        # Individual book display card
│   │   ├── Categories/      # Book categories browsing
│   │   ├── Footer/          # Application footer
│   │   ├── Hero/            # Impactful landing banner
│   │   ├── Home/            # Main Home component entry
│   │   ├── MapSection/      # Leaflet map integration for store locations
│   │   ├── Navbar/          # Responsive navigation with role-based links
│   │   ├── PopularBooks/    # Curated popular books section
│   │   ├── PromoBanners/    # Promotional marketing banners
│   │   ├── RecentlyAdded/   # New arrivals showcase
│   │   ├── RecommendedBooks/# Personalized recommendations
│   │   ├── Root/            # High-level layout wrapper
│   │   ├── Services/        # Store service highlights
│   │   ├── Shared/          # Components used across multiple pages
│   │   └── Testimonials/    # User reviews and feedback slider
│   ├── context/             # Global state management (Auth, Theme)
│   │   ├── AuthContext.js   # Authentication state definition
│   │   └── AuthProvider.jsx # Firebase connection logic & user state
│   ├── firebase/            # Firebase SDK configuration & initialization
│   ├── hooks/               # Custom React hooks for logic reuse
│   │   ├── useAdmin.jsx     # Logic to identify admin status
│   │   ├── useAuth.jsx      # Hook for accessing authentication data
│   │   ├── useAxios.jsx     # Public Axios instance for basic API calls
│   │   └── useAxiosSecure.jsx# Secure Axios with JWT interceptors
│   ├── pages/               # Full-page views and layouts
│   │   ├── About/           # Team information and mission
│   │   ├── AllBooks/        # Searchable and filterable catalog
│   │   ├── BookDetails/     # In-depth book specifications & reviews
│   │   ├── Contact/         # Support system and contact form
│   │   ├── Dashboard/       # Role-specific administrative panels
│   │   │   ├── Admin/       # User management and platform control
│   │   │   ├── Librarian/   # Stock updates and return management
│   │   │   ├── User/        # Order tracking and wishlist management
│   │   │   └── Shared/      # Sidebar, Profile, and common elements
│   │   ├── ErrorPage/       # 404 and application error handling
│   │   ├── Login/           # Authentication portal (Email/Google)
│   │   └── Register/        # Account creation workflow
│   ├── Routes/              # Routing logic (React Router 7)
│   ├── index.css            # Global Tailwind 4 styles & typography
│   └── main.jsx             # React 19 application entry point
├── package.json             # NPM scripts and project dependencies
├── vite.config.js           # Vite build and server configuration
└── .env.local               # Environment variables (Firebase & API)
```

---

## 🚀 Detailed Installation Process

Follow these steps to set up the client-side application locally:

### 1. Prerequisites
Ensure you have the following installed:
- **Node.js**: Version 18.0.0 or higher
- **npm**: (Included with Node.js)

### 2. Clone and Navigate
If you haven't already, clone the client repository and enter the directory:
```bash
git clone https://github.com/alhasandhali/book-courier-client-side.git
cd book-courier-client-side
```

### 3. Install Dependencies
Install all required packages listed in `package.json`:
```bash
npm install
```

### 4. Setup Environment Variables
Create a file named `.env.local` in the root of the `book-courier-client-side` folder and add your credentials:
```env
# Firebase Configuration
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_project_id.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project_id.appspot.com
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id

# Backend API URL (Connect to local server or live API)
VITE_base_url=http://localhost:5000
```

### 5. Launch the Development Server
Run the following command to start the app in development mode:
```bash
npm run dev
```
The application will be accessible at [http://localhost:5173](http://localhost:5173).

---

## 🛠️ Build for Production
To generate a production-ready bundle (output to `dist/` folder):
```bash
npm run build
```

---

## 📄 License
Internal use for the PHW BookCourier project. Developed for a premium bookstore experience.
