from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app import crud, schemas, models, auth
from app.database import get_db
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/tickets", tags=["tickets"])

@router.get("/", response_model=List[schemas.Ticket])
async def get_tickets(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    priority: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    try:
        return crud.get_tickets(
            db,
            skip=skip,
            limit=limit,
            status=status,
            priority=priority
        )
    except Exception as e:
        logger.error(f"Error fetching tickets: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch tickets"
        )

@router.post("/", response_model=schemas.Ticket)
async def create_ticket(
    ticket: schemas.TicketCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    try:
        return crud.create_ticket(
            db=db,
            ticket=ticket,
            user_id=current_user.id
        )
    except Exception as e:
        logger.error(f"Error creating ticket: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create ticket"
        )

@router.get("/{ticket_id}", response_model=schemas.Ticket)
async def get_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    ticket = crud.get_ticket(db, ticket_id=ticket_id)
    if ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@router.put("/{ticket_id}", response_model=schemas.Ticket)
async def update_ticket(
    ticket_id: int,
    ticket_update: schemas.TicketUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    try:
        updated_ticket = crud.update_ticket(
            db,
            ticket_id=ticket_id,
            ticket_update=ticket_update
        )
        if updated_ticket is None:
            raise HTTPException(status_code=404, detail="Ticket not found")
        return updated_ticket
    except Exception as e:
        logger.error(f"Error updating ticket: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update ticket"
        )

@router.get("/{ticket_id}/history", response_model=List[schemas.TicketHistory])
async def get_ticket_history(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.get_ticket_history(db, ticket_id=ticket_id)