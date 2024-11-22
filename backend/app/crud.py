from datetime import datetime
from sqlalchemy.orm import Session
from app import models, schemas
from app.core.security import get_password_hash
import logging

logger = logging.getLogger(__name__)

def get_user_by_email(db: Session, email: str):
    try:
        return db.query(models.User).filter(models.User.email == email).first()
    except Exception as e:
        logger.error(f"Error getting user by email: {str(e)}")
        raise

def create_user(db: Session, user: schemas.UserCreate):
    try:
        hashed_password = get_password_hash(user.password)
        db_user = models.User(
            email=user.email,
            name=user.name,
            role=user.role,
            hashed_password=hashed_password,
            created_at=datetime.utcnow(),
            is_active=True
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        db.rollback()
        logger.error(f"Error creating user: {str(e)}")
        raise