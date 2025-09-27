import sys
import os
import uvicorn

# Add the backend folder to Python path so 'app' can be imported
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.main import app
from app.core.database import create_tables

if __name__ == "__main__":
    # Create database tables
    create_tables()
    
    # Run the FastAPI application
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

