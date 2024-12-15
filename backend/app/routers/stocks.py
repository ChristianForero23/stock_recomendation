from fastapi import APIRouter

router = APIRouter()

@router.get("/{stock_id}")
def get_stock(stock_id: int):
    return {"stock_id": stock_id, "recommendation": "buy"}
