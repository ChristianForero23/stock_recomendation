from fastapi import FastAPI
from app.routers import auth, stocks, portfolio
from app.database import Base, engine


app = FastAPI(title="Stock by Choice API")
# Crear las tablas
Base.metadata.create_all(bind=engine)

# Rutas
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(stocks.router, prefix="/api/stocks", tags=["Stocks"])
app.include_router(portfolio.router, prefix="/api/portfolio", tags=["portfolio"])