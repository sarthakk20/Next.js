# Auth Using Next.js (App Router)

This project is built using the following technologies:

- Next.js
- React
- MongoDB
- Nodejs
- TypeScript
- Tailwind CSS
- MailTrap
---
# Features
- ✅ User Registration & Login  
- 📧 Email Verification with Expiry  
- 🔄 Forgot Password with Token Expiry  
- 🛡️ Password Hashing using `bcryptjs` 
---
# Getting Started
- **User Authentication**
  - Register new users
  - Login with email & password
  - Email verification via token
- **Security**
  - Hashed passwords using `bcryptjs`
  - JWT authentication for protected routes
  - Token expiry handling
- **Forgot Password**
  - Generates reset token
  - Token expiry time
  - Password reset functionality

# Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sarthakk20/Next.js.git 
    cd MY-APP
    ```


2. Install dependencies:
   ```bash
   npm install axios bcrypt bcryptjs dotenv jsonwebtoken mongoose nodemailer react-hot-toast react mongodb tailwindcss all
   ```
3. Create a `.env` file in the root directory and add your environment variables:
   ```bash
   MONGO_URI=your_mongodb_uri
   DOMAIN=your_domain
   TOKEN_SECRET=your_jwt_secret
   user=your_mailtrap_user
   password=your_mailtrap_password
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000` to see the application in action.

6. Add `/login` to `http://localhost:3000` to access the authentication features.

        