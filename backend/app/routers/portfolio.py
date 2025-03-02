from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.dependencies import get_current_user
from app.database import get_db
from app.models import Portfolio, PortfolioStocks, Stock, User
from typing import List

router = APIRouter()

class StockItem(BaseModel):
    stock_id: int
    quantity: int

class PortfolioRequest(BaseModel):
    portfolio_name: str
    stocks: List[StockItem]

@router.post("/create_portfolio")
def create_portfolio(
    request: PortfolioRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Create a new portfolio with stocks.
    """
    try:
        # Create a new portfolio
        portfolio = Portfolio(name=request.portfolio_name, user_id=current_user.id)
        db.add(portfolio)
        db.commit()
        db.refresh(portfolio)

        # Add stocks to the portfolio
        for stock in request.stocks:
            # Verify if the stock exists
            stock_data = db.query(Stock).filter(Stock.id == stock.stock_id).first()
            if not stock_data:
                raise HTTPException(status_code=404, detail=f"Stock with ID {stock.stock_id} not found")

            portfolio_stock = PortfolioStocks(
                portfolio_id=portfolio.id_portfolio,
                stock_id=stock.stock_id,
                quantity=stock.quantity,
                total_value=stock_data.last_price * stock.quantity,
            )
            db.add(portfolio_stock)

        db.commit()
        return {"message": f"Portfolio '{request.portfolio_name}' created successfully."}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error creating portfolio: {str(e)}")

@router.post("/add_stock")
def add_stock_to_portfolio(
    portfolio_id: int,
    stock_id: int,
    quantity: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Add a stock to an existing portfolio.
    """
    # Verify that the portfolio belongs to the user
    portfolio = db.query(Portfolio).filter(
        Portfolio.id == portfolio_id,
        Portfolio.user_id == current_user.id,
    ).first()

    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found or does not belong to the user")

    # Fetch the stock
    stock = db.query(Stock).filter(Stock.id == stock_id).first()
    if not stock:
        raise HTTPException(status_code=404, detail="Stock not found")

    # Calculate the total value
    total_value = stock.last_price * quantity

    # Add stock to portfolio
    portfolio_stock = PortfolioStocks(
        portfolio_id=portfolio_id,
        stock_id=stock_id,
        quantity=quantity,
        total_value=total_value,
    )
    db.add(portfolio_stock)
    db.commit()

    return {"message": "Stock added successfully to portfolio", "portfolio_id": portfolio_id, "stock_id": stock_id}

