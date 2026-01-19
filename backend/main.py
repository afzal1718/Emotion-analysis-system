from fastapi import FastAPI,UploadFile,File,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from emotion import analyze_img
from database import SessionLocal
from models import EmotionLog

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db=SessionLocal()
    try:
        return db
    except:
        return "db error occured"
    finally:
        db.catch()

@app.get('/')
async def root():
    return {"messsage":"server running"}

@app.post("/analyze")
async def upload_image(file :UploadFile = File(...)):

    
    print("analyze endpoint called")
    try:
        image_bytes=await file.read()

        print("Image bytes length:", len(image_bytes))

        emotion_1=analyze_img(image_bytes)

        print("Emotion detected:", emotion_1)

        db=SessionLocal()

        log=EmotionLog(
            image=image_bytes,
            emotion=emotion_1
        )

        db.add(log)
        db.commit()
        db.refresh(log)

        return {"id":log.id,
                "emotion": emotion_1,
                }
    
    except Exception as e:
        print("analyze error",e)
        raise HTTPException(status_code=500,detail= str(e))