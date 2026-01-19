from deepface import DeepFace
import uuid
import os

def analyze_img(image_bytes:bytes):

    temp=f"temp_{uuid.uuid4().hex}.jpeg"

    with open (temp,"wb") as f:
        f.write(image_bytes)

    print(" File saved, running DeepFace...")

    result=DeepFace.analyze(img_path =temp,actions=["emotion"],enforce_detection=False)

    print( result)

        # Handle result type difference
    if isinstance(result, list):
        emotion = result[0]["dominant_emotion"]
    else:
       emotion = result["dominant_emotion"]
    
    os.remove(temp)
    
    return emotion


    