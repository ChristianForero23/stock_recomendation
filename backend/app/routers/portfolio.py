from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_portfolio():
    return {"message": "Portfolio management coming soon!"}
