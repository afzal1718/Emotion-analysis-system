from sqlalchemy import Column, Integer, String, LargeBinary, DateTime
from datetime import datetime
from database import Base

class EmotionLog(Base):
    __tablename__="emotion_log"

    id=Column(Integer,primary_key=True,index=True)
    image=Column(LargeBinary)
    emotion=Column(String)
    created_at=Column(DateTime,default=datetime.utcnow)