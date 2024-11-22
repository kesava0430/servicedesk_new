from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Boolean, Float, Text, ARRAY
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base

# Enums
class TicketStatus(str, enum.Enum):
    OPEN = "open"
    IN_PROGRESS = "in-progress"
    RESOLVED = "resolved"
    CLOSED = "closed"

class TicketPriority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)

    # Relationships
    tickets_created = relationship("Ticket", back_populates="creator", foreign_keys="[Ticket.created_by_id]")
    tickets_assigned = relationship("Ticket", back_populates="assignee", foreign_keys="[Ticket.assigned_to_id]")

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    status = Column(Enum(TicketStatus), default=TicketStatus.OPEN)
    priority = Column(Enum(TicketPriority))
    category = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    due_date = Column(DateTime, nullable=True)
    created_by_id = Column(Integer, ForeignKey("users.id"))
    assigned_to_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    tags = Column(ARRAY(String), nullable=True)

    # Relationships
    creator = relationship("User", back_populates="tickets_created", foreign_keys=[created_by_id])
    assignee = relationship("User", back_populates="tickets_assigned", foreign_keys=[assigned_to_id])
    history = relationship("TicketHistory", back_populates="ticket")
    comments = relationship("Comment", back_populates="ticket")

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"))
    ticket_id = Column(Integer, ForeignKey("tickets.id"), nullable=True)

    # Relationships
    user = relationship("User")
    ticket = relationship("Ticket", back_populates="comments")

class TicketHistory(Base):
    __tablename__ = "ticket_history"

    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(Integer, ForeignKey("tickets.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    field_name = Column(String)
    old_value = Column(String, nullable=True)
    new_value = Column(String)
    change_type = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    ticket = relationship("Ticket", back_populates="history")
    user = relationship("User")