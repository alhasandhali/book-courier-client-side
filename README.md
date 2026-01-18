# 📚 BookCourier - Modern Bookstore Platform (Client Side)

BookCourier is a premium, feature-rich web application designed for a seamless book browsing, ordering, and management experience. Built with the latest web technologies, it offers a polished interface for readers, librarians, and administrators alike. This is the client-side frontend for the BookCourier ecosystem, powered by a robust backend.

## 🚀 Key Features & Functionalities

### 👤 Guest & User Experience
- **Interactive Landing Page**: Featuring dynamic Hero carousels, curated collections (Best Sellers, Recommended, Recently Added), and promotional banners to drive engagement.
- **Advanced Book Explorer**: A robust search and filter system allowing users to find books by title, author, or category, with real-time price-based sorting.
- **Detailed Book Insights**: High-quality book details page showing descriptions, pricing, availability, and user reviews.
- **Smart Wishlist**: Users can save their favorite books to a personal wishlist for future purchases.
- **Secure Ordering & Payments**: Unified checkout process where users can place orders and manage payments (Invoices).
- **Profile Management**: Customizable user profiles with personal details and history tracking.

### 🛡️ Role-Based Dashboards
- **User Dashboard**:
  - **My Orders**: Track the status of all current and past orders.
  - **Invoices**: View and download payment records for transparency.
  - **Personal Wishlist**: Quick access to saved books.
  - **Payment Integration**: Secure payment processing for orders.
- **Librarian Dashboard**:
  - **Inventory Management**: Add new books with high-quality image uploads (integrated with Imgbb).
  - **Stock Control**: Real-time stock updates for managed books to ensure inventory accuracy.
  - **Order Tracking**: Manage issued books, update shipping status (Shipped/Delivered), and handle cancellations.
  - **Return Management**: flexible "Return Day" updates to track and modify book return schedules for customers.
- **Admin Dashboard**:
  - **User Usage**: Oversee all registered users and manage roles (User ↔ Librarian ↔ Admin).
  - **Global Inventory**: Manage all books across the platform (Publish/Unpublish/Delete).
  - **Order Management**: View and manage all orders placed on the platform, including shipping status updates and cancellations.
  - **Platform Overview**: Real-time statistics on total users, revenue, and order distribution.

### 🎨 Design & UI/UX
- **Premium Aesthetics**: Crafted with **Tailwind CSS 4** and **DaisyUI 5** for a modern, sleek look.
- **Fully Responsive**: Optimized for Mobile, Tablet, and Desktop with fluid layouts and touch-friendly components.
- **Rich Interactions**: Smooth animations using **Swiper.js**, location mapping with **React Leaflet**, and tactile feedback via **React Hot Toast**.
- **Dark Mode Support**: Harmonious color palettes designed for comfort in any lighting.

## 🛠️ Technology Stack

### Frontend (This Repository)
- **Framework**: [React 19](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [DaisyUI 5](https://daisyui.com/)
- **State Management**: [TanStack React Query 5](https://tanstack.com/query) for efficient caching and synchronization.
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth) for secure login/registration (including Google Login).
- **Navigation**: [React Router 7](https://reactrouter.com/) with protected route logic.
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) for optimized performance.
- **API Communication**: [Axios](https://axios-http.com/) for reliable backend requests.
- **Maps**: [React Leaflet](https://react-leaflet.js.org/) for interactive maps.

### Backend (Context)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (using native driver)
- **Security**: JWT tokens (via HTTP-only cookies) for secure role-based access control.

## 📦 Installation & Setup

Follow these steps to get the project running on your local machine.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd book-courier-client-side
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and add the following variables. You will need a Firebase project and an Imgbb API key.

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend API URL
VITE_API_URL=http://localhost:5000

# Image Hosting (Imgbb)
VITE_img_hosting=your_imgbb_api_key
```

### 4. Run the Application
Start the development server:
```bash
npm run dev
```
The app should now be running at `http://localhost:5173` (or the port shown in your terminal).

### 5. Build for Production
To create a production-ready build:
```bash
npm run build
```

## 📂 Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components
├── contexts/        # React Context providers (Auth, etc.)
├── firebase/        # Firebase initialization and config
├── hooks/           # Custom React hooks (useAuth, useAxiosSecure, etc.)
├── pages/           # Page components (Home, Dashboard, Login, etc.)
├── routes/          # Routing configuration and PrivateRoute
└── main.jsx         # Entry point
```

---

Built with ❤️ for a better reading world.
