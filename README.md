<div align="center">

# 🔐 Next.js Full-Stack Auth System

An robust, Responsive, Minimalistic and full-stack authentication boilerplate built with **Next.js 15 (App Router)**, **TypeScript**, **MongoDB (Mongoose)**, and **Tailwind CSS v4**.

Features secure JWT authentication via HTTP-only cookies, email verification, password reset workflows with expiring tokens, Zod schema validation, and Next.js edge middleware route protection.

<br />

[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zod](https://img.shields.io/badge/Validation-Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)

[Features](#-key-features) • [Tech Stack](#-tech-stack--libraries) • [Architecture](#-auth-architecture--flow) • [Project Structure](#-project-structure) • [Getting Started](#-getting-started) • [API Reference](#-api-endpoints)

</div>

---

## ✨ Key Features

- 👤 **User Registration & Login** — Secure account creation and authentication powered by bcrypt-hashed passwords.
- 🍪 **JWT & HTTP-Only Cookies** — Stateless session handling with tamper-proof token storage in HTTP-only cookies.
- 🛡️ **Edge Middleware Protection** — Route guarding for protected endpoints (`/profile`) and smart redirection for authenticated sessions.
- 📧 **Email Verification** — Automated email delivery via Mailtrap / Nodemailer with time-limited verification tokens.
- 🔑 **Password Reset Flow** — Secure token generation with expiry for forgotten password recovery.
- 📐 **Schema Validation with Zod** — Type-safe client and server-side input validation for usernames, emails, and passwords.
- 🎨 **Minimal Modern UI** — Polished dark-mode-first interface crafted with Tailwind CSS v4 and dynamic notifications using `react-hot-toast`.

---

## 🛠️ Tech Stack & Libraries

### Core Framework & Runtime

| Package                                                             | Version  | Purpose                                                                |
| :------------------------------------------------------------------ | :------- | :--------------------------------------------------------------------- |
| [`next`](https://nextjs.org/)                                       | `15.4.4` | React framework with App Router, server actions, and Turbopack support |
| [`react`](https://react.dev/) & [`react-dom`](https://reactjs.org/) | `19.1.0` | Frontend component library and virtual DOM rendering                   |
| [`typescript`](https://www.typescriptlang.org/)                     | `^5.0.0` | Static typing, interface definitions, and compile-time safety          |

### Authentication & Security

| Package                                                                                                     | Version   | Purpose                                                  |
| :---------------------------------------------------------------------------------------------------------- | :-------- | :------------------------------------------------------- |
| [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken)                                                | `^9.0.2`  | Signing and verifying JSON Web Tokens for stateless auth |
| [`bcryptjs`](https://github.com/dcodeIO/bcrypt.js) / [`bcrypt`](https://github.com/kelektiv/node.bcrypt.js) | `^3.0.2`  | Salting and hashing passwords & security tokens          |
| [`@types/jsonwebtoken`](https://npmjs.com/package/@types/jsonwebtoken)                                      | `^9.0.10` | TypeScript definitions for JWT                           |
| [`@types/bcryptjs`](https://npmjs.com/package/@types/bcryptjs)                                              | `^2.4.6`  | TypeScript definitions for bcryptjs                      |

### Database & Modeling

| Package                               | Version   | Purpose                                                         |
| :------------------------------------ | :-------- | :-------------------------------------------------------------- |
| [`mongoose`](https://mongoosejs.com/) | `^8.16.5` | ODM (Object Data Modeling) layer for MongoDB schemas and models |
| [`mongodb`](https://www.mongodb.com/) | `^6.18.0` | Official MongoDB client driver for Node.js                      |

### Mailing & Notifications

| Package                                           | Version  | Purpose                                                      |
| :------------------------------------------------ | :------- | :----------------------------------------------------------- |
| [`nodemailer`](https://nodemailer.com/)           | `^7.0.5` | SMTP email dispatch for verification and password reset      |
| [`react-hot-toast`](https://react-hot-toast.com/) | `^2.5.2` | Clean, responsive toast alerts for feedback and error states |

### Validation & Utilities

| Package                                        | Version   | Purpose                                                           |
| :--------------------------------------------- | :-------- | :---------------------------------------------------------------- |
| [`zod`](https://zod.dev/)                      | `^4.6.5`  | Declarative schema validation for user credentials and auth forms |
| [`axios`](https://axios-http.com/)             | `^1.11.0` | Promise-based HTTP client for API requests                        |
| [`dotenv`](https://github.com/motdotla/dotenv) | `^17.2.1` | Environment variable management                                   |

### Styling & Build Tools

| Package                                                             | Version  | Purpose                                      |
| :------------------------------------------------------------------ | :------- | :------------------------------------------- |
| [`tailwindcss`](https://tailwindcss.com/)                           | `^4.0.0` | Utility-first styling framework              |
| [`@tailwindcss/postcss`](https://tailwindcss.com/docs/installation) | `^4.0.0` | Next-generation Tailwind PostCSS integration |
| [`eslint`](https://eslint.org/) & `eslint-config-next`              | `^9.0.0` | Linting and code quality enforcement         |

---

## ⚡ Auth Architecture & Flow

```
[ User Request ] ───► [ Next.js Middleware (Route Guard) ]
                              │
             ┌────────────────┴────────────────┐
             ▼                                 ▼
      [ Public Route ]                  [ Protected Route ]
      (/login, /signup)                    (/profile)
             │                                 │
   Token present? ──► Redirect /profile   No Token? ──► Redirect /login
```

```
[ Signup Flow ]     ──► Validate (Zod) ──► Hash Password (Bcrypt) ──► Save to DB ──► Send Mail (Mailtrap)
[ Verification ]    ──► Validate Token Query ──► Match DB Verify Token ──► Set isVerified: true
[ Login Flow ]      ──► Validate Credentials ──► Sign JWT ──► Set HTTP-Only Cookie
[ Password Reset ]  ──► Generate Reset Token (1hr expiry) ──► Send Email ──► Update Password in DB
```

---

## 📂 Project Structure

```text
my-app/
├── public/                     # Static assets (favicons, images)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── user/
│   │   │       ├── login/          # POST: User authentication & JWT cookie creation
│   │   │       ├── logout/         # GET/POST: Clear session cookie
│   │   │       ├── signup/         # POST: Register user & trigger verification email
│   │   │       ├── Me(User)/       # GET: Fetch authenticated user payload
│   │   │       ├── verifyemail/    # POST: Token verification & account activation
│   │   │       ├── forgotpassword/ # POST: Trigger password reset email
│   │   │       └── resetpassword/  # POST: Verify reset token & apply new password
│   │   ├── forgotpassword/         # Page: Request reset link
│   │   ├── login/                  # Page: User login form
│   │   ├── profile/                # Page: Protected user dashboard
│   │   ├── resetpassword/          # Page: Reset password with token
│   │   ├── signup/                 # Page: Account registration form
│   │   ├── verifyemail/            # Page: Email verification handler
│   │   ├── globals.css             # Tailwind CSS styles & design tokens
│   │   ├── layout.tsx              # Root layout with toaster provider
│   │   └── page.tsx                # Welcome landing page
│   ├── dbConfig/
│   │   └── dbConfig.ts             # Cached Mongoose MongoDB connection
│   ├── helpers/
│   │   ├── getDataFromToken.ts     # Decodes JWT from HTTP request cookies
│   │   └── mailer.ts               # Nodemailer transporter & HTML email templates
│   ├── models/
│   │   └── userModel.ts            # Mongoose User schema & model definition
│   ├── schemas/
│   │   └── authSchema.ts           # Zod schemas for signup & login validation
│   └── middleware.ts               # Edge middleware route protection & redirects
├── .env.example                    # Environment variable configuration template
├── package.json                    # Project dependencies and run scripts
├── tsconfig.json                   # TypeScript configuration
└── next.config.ts                  # Next.js configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.18.0 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- [Mailtrap](https://mailtrap.io/) account (for sandbox email testing)

### 2. Clone the Repository

```bash
git clone https://github.com/sarthakk20/Next.js.git
cd Next.js/my-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root of `my-app/`:

```env
# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/auth-db?retryWrites=true&w=majority

# App & Security
DOMAIN=http://localhost:3000
TOKEN_SECRET=your_super_secret_jwt_key_here

# Mailtrap / SMTP Configuration
MAILTRAP_USER=your_mailtrap_user_id
MAILTRAP_PASS=your_mailtrap_password
```

### 5. Run the Development Server

```bash
npm run dev
```

Visit [`http://localhost:3000`](http://localhost:3000) in your browser.

---

## 📡 API Endpoints

| Method | Endpoint                   | Description                                         | Protected |
| :----- | :------------------------- | :-------------------------------------------------- | :-------: |
| `POST` | `/api/user/signup`         | Registers a new user and sends verification email   |    ❌     |
| `POST` | `/api/user/login`          | Authenticates user and sets HTTP-only JWT cookie    |    ❌     |
| `GET`  | `/api/user/logout`         | Clears auth cookie to log user out                  |    ❌     |
| `GET`  | `/api/user/Me(User)`       | Returns details of the currently authenticated user |  🔒 Yes   |
| `POST` | `/api/user/verifyemail`    | Validates verification token and activates account  |    ❌     |
| `POST` | `/api/user/forgotpassword` | Dispatches password reset email with token          |    ❌     |
| `POST` | `/api/user/resetpassword`  | Updates password using valid reset token            |    ❌     |

---

## 🛡️ Security & Best Practices

- **HTTP-Only Cookies**: JWT is stored in an HTTP-only cookie, preventing client-side XSS access.
- **Salted Password Hashing**: Passwords and reset tokens are salted and hashed using `bcryptjs` (10 rounds).
- **Time-Bound Tokens**: Verification and reset tokens automatically expire after **1 hour**.
- **Middleware Guard**: Next.js Edge Middleware checks authentication on every matched route before rendering page content.
- **Input Sanitization**: Client and server inputs are strictly checked against **Zod** validation schemas.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/sarthakk20">Sarthak</a></sub>
</div>
