from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime
from typing import Optional, List, Dict, Any
from app.models import TicketStatus, TicketPriority, TaskStatus, TaskPriority

# Base User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    password: Optional[str] = None
    role: Optional[str] = None

class User(UserBase):
    id: int
    created_at: datetime
    is_active: bool
    model_config = ConfigDict(from_attributes=True)

# Ticket Schemas
class TicketBase(BaseModel):
    title: str
    description: str
    priority: TicketPriority
    category: Optional[str] = None
    tags: Optional[List[str]] = None

class TicketCreate(TicketBase):
    pass

class TicketUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TicketStatus] = None
    priority: Optional[TicketPriority] = None
    category: Optional[str] = None
    assigned_to_id: Optional[int] = None
    tags: Optional[List[str]] = None

class Ticket(TicketBase):
    id: int
    status: TicketStatus
    created_at: datetime
    updated_at: datetime
    due_date: Optional[datetime] = None
    created_by_id: int
    assigned_to_id: Optional[int] = None
    department_id: Optional[int] = None
    model_config = ConfigDict(from_attributes=True)

# Comment Schemas
class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    ticket_id: Optional[int] = None
    task_id: Optional[int] = None

class Comment(CommentBase):
    id: int
    created_at: datetime
    updated_at: datetime
    user_id: int
    ticket_id: Optional[int] = None
    task_id: Optional[int] = None
    model_config = ConfigDict(from_attributes=True)

# History Schemas
class HistoryBase(BaseModel):
    field_name: str
    old_value: Optional[str] = None
    new_value: str
    change_type: str

class TicketHistory(HistoryBase):
    id: int
    ticket_id: int
    user_id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Auth Schemas
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: User