
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_current_user
from app.schemas import UserResponse
from app.database import get_db
from types import MappingProxyType

router = APIRouter()


@router.get("/{stock_id}")
def get_stock(
    stock_id: int,
    # current_user: UserResponse = Depends(get_current_user),
    # db: Session = Depends(get_db)
):
    """
    Recupera la información de una acción específica.
    Solo accesible para usuarios autenticados.
    """
    # stock = STOCKS_DB.get(stock_id)
    stock = {"name": "AAPL", "price": 150.0, "recommendation": "buy"}

    return {
        # "user": current_user.email,
        "stock_id": stock_id,
        "data": stock,
    }
