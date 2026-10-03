from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

router = APIRouter(tags=["Sentiment Analysis"])
analyzer = SentimentIntensityAnalyzer()


class FeedbackRequest(BaseModel):
    review_text: str


class BatchRequest(BaseModel):
    reviews: list[str]


@router.post("/sentiment")
def analyze_sentiment(req: FeedbackRequest):
    if not req.review_text.strip():
        raise HTTPException(400, "review_text cannot be empty")
    scores = analyzer.polarity_scores(req.review_text)
    compound = scores["compound"]
    label = "positive" if compound >= 0.05 else "negative" if compound <= -0.05 else "neutral"
    return {"sentiment": label, "confidence": round(abs(compound), 3)}


@router.post("/sentiment/batch")
def analyze_batch(req: BatchRequest):
    if not req.reviews:
        raise HTTPException(400, "reviews list cannot be empty")
    counts = {"positive": 0, "negative": 0, "neutral": 0}
    detailed = []
    for text in req.reviews:
        compound = analyzer.polarity_scores(text)["compound"]
        label = "positive" if compound >= 0.05 else "negative" if compound <= -0.05 else "neutral"
        counts[label] += 1
        detailed.append({"review": text, "sentiment": label, "confidence": round(abs(compound), 3)})
    return {"summary": counts, "details": detailed}