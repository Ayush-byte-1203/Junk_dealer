# JunkDealer Backend API

This is the RESTful API service for the JunkDealer application, built with **Django** and **Django REST Framework**.

## 🏗️ Architecture

The backend operates on a **CSV-based persistence layer** instead of a traditional relational database (SQL) for simplicity and portability in this specific deployment environment.

### Project Structure
- `junkdealer_project/`: Main settings.
- `authentication/`: User auth (Login, Register).
- `utils/`: Core utilities including the CSV handler.
- `data/`: The "Database" - a collection of CSV files.

## 💾 Data Models (CSV)

The application state is stored in `backend/data/*.csv`.

### `users.csv`
Stores user accounts for Customers, Dealers, and Admins.
- **Columns**: `id`, `username`, `password`, `role`, `name`, `email`, `phone`, `location`, `joined_date`
- **Roles**: `customer`, `dealer`, `admin`

### `products.csv`
Inventory managed by Dealers.
- **Columns**: `id`, `dealer_id`, `name`, `description`, `price_per_kg`, `category`, `image`

### `pickups.csv`
Pickup requests created by Users.
- **Columns**: `id`, `user_id`, `dealer_id`, `status`, `scheduled_date`, `items`, `total_weight`, `address`, `notes`
- **Status Enum**: `Pending`, `Scheduled`, `Completed`, `Cancelled`

### `orders.csv`
Transaction history and payments.
- **Columns**: `id`, `user_id`, `dealer_id`, `pickup_id`, `amount`, `status`, `date`, `description`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login/`: Authenticate user and return role/token.
- `POST /api/auth/register/`: Create a new User or Dealer account.

### Admin (Planned)
- `GET /api/admin/users/`: List all users.
- `GET /api/admin/dealers/`: List all dealers.

### Dealer (Planned)
- `GET/POST /api/dealer/products/`: Manage inventory.
- `GET /api/dealer/orders/`: View incoming pickup requests.

## 🚀 Getting Started

1.  **Dependencies**
    Make sure you have Python installed.
    ```bash
    pip install -r requirements.txt
    ```

2.  **Run Server**
    ```bash
    python manage.py runserver
    ```
    API will happen at: `http://localhost:8000/`

3.  **Data Management**
    You can manually edit the CSV files in `data/` to reset or modify application state. The changes are reflected immediately upon the next API call (no migration needed).

## 🛠️ Utilities

### `utils/csv_handler.py`
This module provides the interface for data access.
- `read_csv(filename)`: Returns list of dicts.
- `append_csv(filename, row, fieldnames)`: Adds a new record.
- `get_next_id(filename)`: Auto-increments ID.
