# 🚀 Job Portal - Modern Recruitment Platform

A full-stack (MERN) recruitment platform designed for seamless job searching and hiring. Featuring a sleek, dark-mode compatible UI, real-time tracking, and role-based dashboards.

---

## ✨ Key Features

### 👤 For Candidates
- **Smart Search**: Filter jobs by title, description, and keywords.
- **Micro-interactions**: Fluid animations using Framer Motion for a premium feel.
- **Candidate Dashboard**: Track application status (Pending, Accepted, Rejected) in real-time.
- **Saved Jobs**: Bookmark interesting listings for future applications.
- **Sleek Profiles**: Manage your skills, bio, and resume with ease.

### 🏢 For Recruiters (Admin)
- **Recruiter Dashboard**: High-level overview of postings and applicant performance.
- **Company Management**: Create and manage multiple business profiles.
- **Job Posting**: Post new openings with requirements and location details.
- **Applicant Tracking**: Review and update the status of incoming applications.

---

## 🛠️ Tech Stack

- **Frontend**: React, Redux Toolkit, Tailwind CSS, shadcn/ui, Framer Motion.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Validation**: Zod (Backend schema validation).
- **Authentication**: JWT (JSON Web Tokens) with HTTP-only cookies.
- **Image Uploads**: Cloudinary integration.

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB URI
- Cloudinary Credentials (for image uploads)

### Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/Jagdish918/Job-Portal.git
   cd Job-Portal
   ```

2. **Backend Configuration**:
   - Create a `.env` file in the `backend/` directory:
     ```env
     PORT=8000
     MONGO_URI=your_mongodb_uri
     SECRET_KEY=your_jwt_secret
     CLOUD_NAME=your_cloudinary_name
     API_KEY=your_cloudinary_api_key
     API_SECRET=your_cloudinary_api_secret
     ```
   - Install dependencies and start:
     ```sh
     cd backend
     npm install
     npm run dev
     ```

3. **Frontend Configuration**:
   - Navigate to the `frontend/` directory and install dependencies:
     ```sh
     cd ../frontend
     npm install
     npm run dev
     ```

---

## 📂 Project Structure

```text
├── backend/            # Express.js Server & MongoDB Models
│   ├── controllers/    # API Request Handlers
│   ├── models/         # Database Schemas
│   ├── routes/         # API Route Definitions
│   └── utils/          # Validation & Database connection
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # UI Components (shadcn/ui, shared)
│   │   ├── hooks/      # Custom React Hooks
│   │   ├── redux/      # Redux Toolkit Slices
│   │   └── utils/      # Constants & Helpers
```

---

## 🌟 Quality Standards
- **Dark Mode**: Fully supports systems color preferences.
- **Responsive**: Mobile-first design grid for all screen sizes.
- **Performant**: Backend pagination for large job listings.
- **Secure**: Robust input validation and HTTP-only cookie tokens.

---

## 📄 License
This project is licensed under the MIT License.
