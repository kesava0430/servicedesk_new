from sqlalchemy.orm import Session
from app import crud, schemas
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

def init_db(db: Session) -> None:
    try:
        # Check if admin user exists
        user = crud.get_user_by_email(db, email=settings.ADMIN_EMAIL)
        
        if not user:
            logger.info("Creating admin user...")
            user_in = schemas.UserCreate(
                email=settings.ADMIN_EMAIL,
                password=settings.ADMIN_PASSWORD,
                name=settings.ADMIN_NAME,
                role="admin"
            )
            user = crud.create_user(db, user=user_in)
            logger.info(f"Admin user created successfully with ID: {user.id}")
        else:
            logger.info("Admin user already exists")