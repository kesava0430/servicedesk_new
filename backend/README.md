## Service Desk Backend Setup

1. Install PostgreSQL if not already installed

2. Create a PostgreSQL database:
```sql
CREATE DATABASE servicedesk;
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Update DATABASE_URL and SECRET_KEY in .env file
```

5. Initialize and upgrade the database:
```bash
# Initialize Alembic (first time only)
alembic init alembic

# Run migrations
alembic upgrade head
```

6. Create a test user:
```python
# Using Python REPL
from app.crud import create_user
from app.schemas import UserCreate
from app.database import SessionLocal

db = SessionLocal()
test_user = UserCreate(
    email="test12@example.com",
    password="password123",
    name="Test User",
    role="admin"
)
create_user(db, test_user)
```

7. Run the server:
```bash
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000
API Documentation (Swagger UI) will be available at http://localhost:8000/docs