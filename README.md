# 🔮 JobSeer – AI + Tarot-Based Career Recommendation System

Welcome to **JobSeer**, where **AI precision meets Tarot intuition**. Designed to help users discover career paths that align with both their **skills and passions**, JobSeer blends **machine learning** with **symbolic reflection** to offer **data-driven** and **motivational** job recommendations like never before.

---
🎥 [Watch Demo Video](https://drive.google.com/file/d/1xB-XLs-ySXiRZWM5GItOYxABxUiz-7ta/view?usp=drive_link)

## ✨ Features

- 🔍 **AI-Powered Job Matching**: Uses TF-IDF + Cosine Similarity to find best-fit jobs based on your skills and interests.
- 🃏 **Tarot-Inspired Career Discovery**: Choose tarot cards to receive insightful job roles mapped to card symbolism.
- 🛡️ **Secure Authentication**: JWT-based login and registration flow.
- 📊 **Dynamic Job Listings**: Real-time job roles fetched via JSearch API.
- 🧭 **Interactive Frontend**: Built using React with smooth user experience and intuitive design.

---

## 🚀 Why JobSeer?

> "Career planning shouldn’t be cold and algorithmic — it should also be inspiring."

Traditional job portals lack emotional depth. JobSeer bridges the gap by merging **logic and intuition**, offering both **structured AI suggestions** and **reflective tarot insights** to guide users in a **holistic** and **enjoyable** career journey.

---

## 🧩 System Architecture

[Screenshot 2025-05-21 113035](https://github.com/user-attachments/assets/d205bb3d-55fa-4c5c-a23a-1b7c0ea33301)


### Frontend (React.js)
- 🧑‍💻 User Authentication (JWT)
- 📋 Skill/Interest input for AI Mode
- 🎴 Tarot Card selection for Reflective Mode
- 🗂️ Dynamic job listings display

### Backend (Node.js + Express)
- 🔐 JWT Auth + Bcrypt password hashing
- 🧠 AI model with TF-IDF + Cosine Similarity
- 🗃️ Tarot-to-career mapping logic
- 🌐 Job role fetching via JSearch API

### Database (MongoDB)
- 👤 Users Collection
- 🃏 TarotMappings Collection
- 📝 JobDataset Collection

---

## 🛠️ Tech Stack

| Layer         | Tech                      |
|--------------|---------------------------|
| Frontend     | React.js, Axios, Tailwind |
| Backend      | Node.js, Express.js       |
| ML Engine    | TF-IDF, Cosine Similarity |
| Database     | MongoDB (NoSQL)           |
| Auth & Security | JWT, Bcrypt.js          |
| External API | JSearch (Job Data)        |

---

## 📦 Installation & Execution

### 🔧 Step 1: Backend Setup
```bash
cd server
npm install
npm run dev
```
- Connect to MongoDB (local or Atlas)
- Configure `.env` with DB URI & JWT Secret

### 🎨 Step 2: Frontend Setup
```bash
cd client
npm install
npm start
```
- Setup React app with Axios
- Use `localStorage` to store JWT tokens securely

### 🧠 Step 3: AI Job Matching
- Preprocess job dataset using TF-IDF
- Compute Cosine Similarity with user input
- Send results to frontend for display

### 🃏 Step 4: Tarot Integration
- Create tarot card UI grid
- Map each card to 2–3 real-world jobs
- Retrieve and show symbolic meaning + job roles

### ✅ Step 5: Test & Deploy
- Use Postman to test backend APIs
- Test all frontend user flows
- Deploy using **Render** (backend) + **Vercel** (frontend)

---

## 📌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/api/auth/signup` | Register a new user |
| POST   | `/api/auth/login` | Authenticate & get JWT |
| POST   | `/api/job/recommend` | AI-based job recommendations |
| POST   | `/api/job/tarot-recommend` | Tarot-based job recommendations |
| GET    | `/api/job/search?title=xyz` | Fetch jobs via JSearch API |

---

## 🧪 Algorithms Used

### 🎯 AI-Based Recommendation
- **TF-IDF Vectorization**
- **Cosine Similarity**
- Job ranking based on relevance

### 🃏 Tarot-Based Suggestion
- Manual tarot card selection
- Tarot-to-job role mapping
- Symbolic motivation + job insight

---

## 🎯 Future Scope

- Add a **progress tracker** to monitor career growth
- Multilingual tarot card descriptions
- **Gamification** features to increase engagement
- Integration with **resume builders** and **career challenges**

---

## 🧑‍💼 Authors & Credits

Developed with ❤️ by the JobSeer Team  
Special thanks to [JSearch API](https://rapidapi.com) for providing real-time job data.

---

## 📃 License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute with attribution.

---

> “Let AI guide your skills and Tarot reflect your soul – discover your dream career with JobSeer.” 🌟

