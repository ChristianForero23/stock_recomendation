from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import UserCreate, Token
from app.crud import get_user_by_email, create_user
from app.core.security import verify_password, create_access_token
from app.database import get_db

router = APIRouter()

@router.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    create_user(db, user.email, user.password)
    return {"access_token": create_access_token({"sub": user.email}), "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, user.email)
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": create_access_token({"sub": user.email}), "token_type": "bearer"}
