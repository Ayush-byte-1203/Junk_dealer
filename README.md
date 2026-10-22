# JunkDealer - Sustainable Waste Management Platform

JunkDealer is a premium, modern web application designed to bridge the gap between waste generators (Users) and certified scrap dealers (Dealers). It facilitates seamless scheduling of pickups, real-time rate tracking, and efficient recycling management with a focus on ease of use and environmental impact.

---

## 📂 Project Structure

### Root Directory
- `backend/`: Django backend server and API logic.
- `src/`: React frontend source code.
- `public/`: Static assets for the React application.
- `package.json`: Frontend dependencies and scripts.
- `tailwind.config.js`: Tailwind CSS configuration for styling.
- `postcss.config.js`: PostCSS configuration for CSS processing.

---

### Frontend Structure (`src/`)
- `components/`: Reusable UI elements.
  - `admin/`: Admin-specific components.
  - `user/`: User-specific components.
  - `ui/`: Base UI components (buttons, inputs, cards).
  - `css/`: Component-specific styling.
- `pages/`: Full-page views and routing.
  - `admin/`: Pages for the admin board.
  - `dealer/`: Pages for the dealer dashboard.
  - `user/`: Pages for the user dashboard.
- `context/`: React Context providers for global state (e.g., Authentication).
- `data/`: Local data files and constants.
- `layouts/`: Shared layout components (Navbar, Footer, Sidebar).
- `lib/`: Utility libraries and configurations.
- `utils/`: Common helper functions.
- `Images/`: Static imagery for the frontend.
- `translations.js`: Localization support for multiple languages.
- `App.js`: Main application component and routing logic.
- `index.js`: Frontend entry point.

---

### Backend Structure (`backend/`)
- `authentication/`: User registration and login logic.
- `admin_dashboard/`: Logic for the administrative interface.
- `dealer_dashboard/`: Features and data for dealers.
- `user_dashboard/`: Features and data for standard users.
- `payments/`: Payment processing and transaction logic.
- `junkdealer_project/`: Main Django project configuration settings.
- `data/`: Backend data storage (CSV and persistent files).
- `utils/`: Backend-specific utility scripts.
- `manage.py`: Django management CLI.
- `requirements.txt`: Python package dependencies.
- `db.sqlite3`: Local SQLite database.

---

## 🚀 Key Features

### **For Users**
- **Intuitive Dashboard**: Monitor earnings, pickups, and your recycling footprint.
- **Easy Booking**: Schedule waste pickups with a few clicks.
- **Live Rate Card**: Access real-time market rates for various materials.
- **Multilingual Support**: Available in English, Hindi, and Gujarati.

### **For Dealers**
- **Smart Management**: Manage incoming orders and inventory analytics.
- **Dynamic Pricing**: Update scrap prices and material availability.
- **Logistics Tracking**: Accept/reject and track pickup requests in real-time.

### **Authentication**
- **Role-Based Access**: Specialized interfaces for Admin, Dealer, and User.
- **Secure Registration**: Streamlined signup process for all roles.
- **Demo Access**: Instant testing with pre-defined credentials.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide React, Framer Motion, Recharts.
- **Backend**: Django (Python), Django REST Framework.
- **Database**: SQLite (Production-ready metadata) & CSV (Portability).

---

## 📦 Getting Started

### Prerequisites
- **Node.js**: v18.x or higher
- **Python**: v3.9 or higher

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/junkdealer.git
   cd junkdealer
   ```

2. **Frontend Setup**
   ```bash
   npm install
   npm start
   ```
   *Runs on `http://localhost:3000`*

3. **Backend Setup**
   In a separate terminal:
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py runserver
   ```
   *Runs on `http://localhost:8000`*

---

## 🔑 Demo Credentials

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin** | `admin` | `admin` |
| **Dealer** | `dealer` | `dealer` |
| **User** | `user` | `user` |

---

Built with 💚 by the JunkDealer Team.
# Junk_dealer
