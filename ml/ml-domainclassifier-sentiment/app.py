# app.py
from fastapi import FastAPI
from domain_router import router as domain_router
from sentiment_router import router as sentiment_router

app = FastAPI(title="ML Services - Domain + Sentiment")

app.include_router(domain_router)
app.include_router(sentiment_router)

@app.get("/")
def root():
    return {"message": "Both ML services running"}