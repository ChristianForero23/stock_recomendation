from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.dependencies import get_current_user
from app.database import get_db
from app.models import Stock  # Importa tu modelo de Stock
import requests
from app.core.config import settings  # Asegúrate de que `DATABASE_URL` venga desde `settings`

# Asegúrate de que DATABASE_URL esté definido correctamente
if not settings.MARKETSTACK_API_KEY:
    raise ValueError("DATABASE_URL no está configurada.")

router = APIRouter()


@router.get("/search")
def search_stocks(
    query: str = Query(...),
    db: Session = Depends(get_db),
):
    """
    Busca acciones basadas en el término de consulta.
    """
    stocks = db.query(Stock).filter(
        Stock.name.ilike(f"%{query}%") | Stock.symbol.ilike(f"%{query}%")
    ).limit(10).all()

    return [
        {"id": stock.id, "name": stock.name, "symbol": stock.symbol}
        for stock in stocks
    ]

@router.get("/details/{stock_symbol}")
def get_stock(
    stock_symbol: str,
):
    """
    Recupera la información de una acción específica.
    Solo accesible para usuarios autenticados.
    """
    # REQUEST MARKETSTACK API
    url = f"http://api.marketstack.com/v2/eod?access_key={settings.MARKETSTACK_API_KEY}&symbols={stock_symbol}&date_to=2024-12-26&limit=1"
    raw_data = requests.get(url).json()
    stock_data = raw_data['data'][0]

    return stock_data

