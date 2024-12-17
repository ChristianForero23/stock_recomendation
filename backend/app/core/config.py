from pydantic import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str = "your_secret_key_here"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM: str = "HS256"
    DATABASE_URL: str = "postgresql://cforero:Derecho201902--@database-1.ct2q6eu2u0gs.us-east-2.rds.amazonaws.com:5432/stock_db"

settings = Settings()
