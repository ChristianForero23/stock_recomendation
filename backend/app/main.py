from fastapi import FastAPI
from app.routers import stocks, portfolio

app = FastAPI(title="Stock by Choice API")

# Rutas principales
app.include_router(stocks.router, prefix="/api/stocks", tags=["stocks"])
app.include_router(portfolio.router, prefix="/api/portfolio", tags=["portfolio"])