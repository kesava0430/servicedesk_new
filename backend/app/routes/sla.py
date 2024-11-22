from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, models, auth
from ..database import get_db
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/sla", tags=["sla"])

@router.get("/policies", response_model=List[schemas.SLAPolicy])
async def get_sla_policies(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    return crud.get_sla_policies(db)

@router.post("/policies", response_model=schemas.SLAPolicy)
async def create_sla_policy(
    policy: schemas.SLAPolicyCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return crud.create_sla_policy(db=db, policy=policy)

@router.get("/breaches", response_model=List[schemas.SLABreach])
async def get_sla_breaches(
    skip: int = 0,
    limit: int = 100,
    acknowledged: bool = False,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    return crud.get_sla_breaches(
        db,
        skip=skip,
        limit=limit,
        acknowledged=acknowledged
    )

@router.post("/breaches/{breach_id}/acknowledge", response_model=schemas.SLABreach)
async def acknowledge_sla_breach(
    breach_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    breach = crud.acknowledge_sla_breach(
        db,
        breach_id=breach_id,
        user_id=current_user.id
    )
    if breach is None:
        raise HTTPException(status_code=404, detail="SLA breach not found")
    return breach