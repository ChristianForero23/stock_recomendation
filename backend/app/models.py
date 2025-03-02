from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime 

class User(Base):
    __tablename__ = "users"
    __table_args__ = {"schema": "users"}  # Ensure schema is correct

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

    # Relationship to Portfolio
    portfolios = relationship("Portfolio", back_populates="user")


class Stock(Base):
    __tablename__ = "stocks"
    __table_args__ = {"schema": "stocks"}

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, unique=True, index=True)
    name = Column(String)
    sector = Column(String)
    industry = Column(String)
    last_updated = Column(DateTime)
    last_price = Column(Float, default=0.0)  # Updated column name

    portfolios = relationship("PortfolioStocks", back_populates="stock")

class Portfolio(Base):
    __tablename__ = "portfolio"
    __table_args__ = {"schema": "portfolio"}

    id_portfolio = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.users.id"), nullable=False)
    name = Column(String, nullable=False)
    creation_date = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="portfolios")
    stocks = relationship("PortfolioStocks", back_populates="portfolio")



class PortfolioStocks(Base):
    __tablename__ = "portfolio_stocks"
    __table_args__ = {"schema": "portfolio"}

    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolio.portfolio.id_portfolio"), nullable=False)
    stock_id = Column(Integer, ForeignKey("stocks.stocks.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    total_value = Column(Float)  # Automatically updated via trigger in the database

    portfolio = relationship("Portfolio", back_populates="stocks")
    stock = relationship("Stock", back_populates="portfolios")
