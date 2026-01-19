## Emotion Analysis System
An end-to-end web application that captures employee facial images at punch-in time, analyzes emotions using a deep learning model, and securely stores emotion records for trend analysis and HR insights. The system is designed with privacy-first principles and a clean separation between frontend, backend, and database layers.
________________________________________
### Project Overview
This project focuses on basic emotion analysis functionality as part of an employee well-being monitoring system.
At the current stage, the application:
•	Captures an image using a webcam (React frontend)
•	Sends the image to a Python backend
•	Detects the dominant emotion using a pre-trained model
•	Stores the emotion, image (binary), and timestamp in PostgreSQL
•	Returns the detected emotion back to the frontend
No images are permanently stored on the filesystem; temporary files are cleaned up automatically.

________________________________________
### Core Features
•	📸 Webcam image capture using browser APIs
•	🤖 Emotion detection using DeepFace
•	⚡ FastAPI-based backend for high performance
•	🗄️ PostgreSQL database integration
•	🔒 Privacy-aware design (no frontend image storage)
•	🔁 End-to-end frontend ↔ backend communication
________________________________________


### Tech Stack
Frontend
•	React.js
•	JavaScript (ES6)
•	HTML5 Canvas
•	Fetch API
•	Bootstrap
Backend
•	Python
•	FastAPI
•	DeepFace
•	TensorFlow (via DeepFace)
Database
•	PostgreSQL
•	SQLAlchemy ORM
•	pgAdmin (for DB management)


### `Project Structure`
```shell
my_react/
│
├── backend/
│   ├── main.py          # FastAPI app and API routes
│   ├── emotion.py       # Emotion analysis logic (DeepFace)
│   ├── database.py      # PostgreSQL connection setup
│   ├── models.py        # Database models
│   ├── create_tables.py# Table creation script
│

├── src/
│   ├── App.js ,App.css          # React frontend logic
│
├── package.json
└── README.md
```

### Application Flow
1.	User opens the web application
2.	Webcam is activated on the capture page
3.	Image is captured from the video stream
4.	Image is converted to a Blob and sent to backend
5.	Backend converts image to bytes
6.	Emotion is detected using DeepFace
7.	Emotion + image + timestamp are stored in PostgreSQL
8.	Detected emotion is returned to frontend


### Privacy Considerations
•	Images are processed temporarily for emotion detection
•	No images are saved permanently on the server filesystem
•	All data access is restricted to backend services
•	Designed to align with employee privacy requirements

## How to Run the Project

### Backend
1. Navigate to backend folder
   cd backend

2. Install dependencies
   pip install -r requirements.txt

3. Start the server
   uvicorn main:app --reload
Backend runs on:
http://127.0.0.1:8000

### Frontend
npm install
npm start
Frontend runs on:
http://localhost:3000

________________________________________
### Future Enhancements
•	Hourly/daily emotion trend analysis
•	HR dashboard for analytics
•	Role-based access control
•	Cloud-based image storage (instead of DB blobs)
•	Deployment on cloud infrastructure
•	Integration with biometric devices
________________________________________
### Learning Outcomes
•	Practical FastAPI backend development
•	Frontend–backend integration using Fetch API
•	Handling binary image data securely
•	Working with ML models in production-like flows
•	PostgreSQL integration using SQLAlchemy
•	Clean project structuring and debugging

Author
Afzal
React. FastAPI. DeepFace. PostgreSQL. 
This project is for academic and learning purposes.

