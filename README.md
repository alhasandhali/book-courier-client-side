# 📖 BookCourier - The Ultimate Bookstore Ecosystem (Client)

![BookCourier Banner](./home-page.png)

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
│   ├── home-page.png        # Banner image
│   └── warehouses.json      # Map data for library locations
├── src/
│   ├── assets/              # Component-specific styles and static images
│   ├── components/          # Reusable UI components (Shared across pages)
│   │   ├── Common/          # Navbar, Footer, Section Titles
│   │   ├── Home/            # Hero, Featured, Collections
│   │   └── Cards/           # Book cards, Wishlist cards
│   ├── context/             # React Context for Auth and Global State
│   ├── firebase/            # Firebase SDK initialization
│   ├── hooks/               # Custom React hooks (useAxios, useAuth, etc.)
│   ├── pages/               # Functional page views
│   │   ├── Home/            # Main landing page
│   │   ├── AllBooks/        # Searchable book catalog
│   │   ├── BookDetails/     # Pricing, reviews, and description
│   │   ├── Dashboard/       # Role-based panels
│   │   │   ├── Admin/       # User management, site stats
│   │   │   ├── Librarian/   # Add/Update books, order tracking
│   │   │   ├── User/        # My orders, Wishlist, Payments
│   │   │   └── Shared/      # Sidebar and common dashboard UI
│   │   ├── Login/           # Firebase Authentication
│   │   └── Register/        # New user enrollment
│   ├── Routes/              # React Router 7 configuration & Protected Routes
│   ├── index.css            # Global Tailwind 4 styles & Design tokens
│   └── main.jsx             # Application entry point
├── package.json             # NPM dependencies (React 19, Tailwind 4)
├── vite.config.js           # Vite build configuration
└── .env.local               # Local environment variables (Firebase/API)
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
