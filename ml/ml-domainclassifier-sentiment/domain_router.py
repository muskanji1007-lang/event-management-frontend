from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
import __main__

router = APIRouter(tags=["Domain Categorization"])

def skill_tokenizer(text):
    return [t.strip().lower() for t in text.split(',') if t.strip()]

__main__.skill_tokenizer = skill_tokenizer

vec = joblib.load("domain_tfidf_v1.pkl")
clf = joblib.load("domain_clf_v1.pkl")


class CategorizeRequest(BaseModel):
    skills_text: str


@router.get("/domains")
def domains():
    return {"domains": sorted(clf.classes_)}


@router.post("/categorize")
def categorize(req: CategorizeRequest):
    if not req.skills_text.strip():
        raise HTTPException(400, "skills_text cannot be empty")
    x = vec.transform([req.skills_text])
    pred = clf.predict(x)[0]
    proba = clf.predict_proba(x)[0].max()
    return {"predicted_domain": str(pred), "confidence": round(float(proba), 3)}