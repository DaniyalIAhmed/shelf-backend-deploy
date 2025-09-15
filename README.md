<h1 align="center">📚 Shelf Backend</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-green?logo=node.js" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-Backend-blue?logo=express"/>
  <img src="https://img.shields.io/badge/Deployed%20on-Render.com-purple?logo=render"/>
</p>

<p align="center">
  <b>The backend API for the <a href="https://github.com/yourusername/shelf">Shelf</a> app.<br>
  Manage users, authentication, and your favorite books!</b>
</p>

---

## 🚀 Features

- User registration & login (JWT authentication)
- Secure password hashing
- User profile management
- RESTful API endpoints
- MongoDB integration
- Ready for deployment on [Render](https://render.com)

---

## 🛠️ Getting Started

### 1. Clone the repository
- Run
```bash
git clone https://github.com/DaniyalIAhmed/shelf-backend-deploy.git
```
### 2. Setup repository
- Before starting off, make sure to run:
```
npm install
```
- Now create a .env file in the root directory with the following variables:
```env
PORT=3000 #(Optional)
API_VERSION=v1 #(Optional)
JWT_SECRET=strong_secret
MONGO_URI=your_cloud_uri

CLOUDINARY_CLOUD_NAME=cloudname
CLOUDINARY_API_KEY=apikey
CLOUDINARY_API_SECRET=secret
```
- Run this command for a strong secret:
```bash
openssl rand -base64 32
```
---