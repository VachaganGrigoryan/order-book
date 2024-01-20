# Stock Service

The Stock Service is a web application built using Django REST for the backend and Next.js for the frontend. It offers essential features such as user registration, login, and an order book functionality with transaction history. Users must log in to access the service, where they can view and manage their own orders and transaction history. The application supports the creation of new BUY or SELL orders.

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) installed on your machine.

### Local Development

1. **Clone the repository:**
    ```bash
    git clone https://github.com/VachaganGrigoryan/order-book.git
    cd order-book
    ```

2. **Build and run the development containers:**
    ```bash
    docker-compose up --build
    ```
3. **Apply database migrations:**

    ```bash
    docker-compose exec app python manage.py migrate
    ```
4. **Create a superuser:**

    ```bash
    docker-compose exec app python manage.py createsuperuser
    ```
5. **Run Django tests:**

    ```bash
    docker-compose exec app python manage.py test
    ```
6. **Access the application:**
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend API: [http://localhost:8000](http://localhost:8000)
    - Django Admin: [http://localhost:8000/admin](http://localhost:8000/admin/)

## Usage

1. Register an account on the Stock Service.
2. Log in with your credentials.
3. Explore the order book and transaction history.
4. Create new BUY or SELL orders.

**Note:** Ensure that you have a working internet connection for proper functionality.

Happy trading! 📈📉
