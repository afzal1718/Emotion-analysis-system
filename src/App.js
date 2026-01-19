import React, {useRef, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"

function App(){

    const [emotion, setEmotion]=useState(null);

    const [capturedimg,setcapturedimg]=useState(null);

    let videoref= useRef(null);

    let photoref=useRef(null);

    // let canvasref=useRef(null);
// to get access to user camera

const getUserCamera = async () =>{
    try{
    const stream=await navigator.mediaDevices.getUserMedia({video:true});

        // attaching the stream to the vedio tag
        let video = videoref.current;

        video.srcObject= stream;
        video.play();
    }
    catch{
        console.error("error occured")
    }
}

// capturepic func

const capturepic = async() =>{

    let photo=photoref.current;
    let video=videoref.current;


    if(!video.srcObject){
        await getUserCamera();
    }

    await new Promise(res => setTimeout(res,300));

    photo.width=video.videoWidth;
    photo.height=video.videoHeight;

    let ctx=photo.getContext('2d');

    ctx.drawImage(video,0,0,photo.width,photo.height);

    const canvas=photoref.current;

    const imagedata=canvas.toDataURL("image/png");
    setcapturedimg(imagedata)


    canvas.toBlob((blob)=>{
        console.log(blob)
        const formdata= new FormData()
        formdata.append("file",blob,"caputre.jpg")
    

    fetch("http://127.0.0.1:8000/analyze",
        {method:"POST",
        body:formdata}
        ).then((response)=>(response.json())
        ).then((formdata)=>{
            console.log("Backend response:", formdata);
            setEmotion(formdata.emotion);});

    },"image/jpeg");    
}


const clearimage = async () =>{
    setcapturedimg(null);
    setEmotion(null);

    await getUserCamera();
}
useEffect(() => {
    getUserCamera()
},[])
    return (
       <div className="container">
            <h1 className="text-center">Emotional Analysis </h1>
            <div className="camera-box">
                <video ref={videoref} autoPlay
                className="camera-media"
                style={{display: capturedimg ? "none":"block"}} ></video> 

                {capturedimg && (<img 
                    src={capturedimg}
                    className="camera-media"></img>)}
            </div>

            <button onClick={capturepic} className="btn btn-danger container"> Capture</button>

            <canvas ref = {photoref} style={{display:"none"}}></canvas>
            <button onClick={clearimage}className="btn-btn-primary container"> Clear Image </button>

            {emotion && (
                <h3 className="emotion-text">
                    Detected Emotion:{" "}
                    <span className={getEmotionClass(emotion)}>
                        {emotion}
                    </span>
                </h3>
            )}
       </div>
    );
}

const getEmotionClass = (emotion) =>{
    switch(emotion?.toLowerCase()){
        case "happy":
            return "emotion-happy";
        case "sad":
            return "emotion-sad";
        case "angry":
            return "emotion-angry";
        case "neutral":
            return "emotion-neutral";
        case "surprise":
            return "emotion-surprise";
        case "fear":
            return "emotion-fear";
        case "disgust":
            return "emotion-disgust";
        default:
            return "emotion-default";
    }
};
export default App;