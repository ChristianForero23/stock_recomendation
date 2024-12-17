from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings  # Asegúrate de que `DATABASE_URL` venga desde `settings`

# Asegúrate de que DATABASE_URL esté definido correctamente
if not settings.DATABASE_URL:
    raise ValueError("DATABASE_URL no está configurada.")

engine = create_engine(
    settings.DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
