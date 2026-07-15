
# 🧩 Nova Code Editor

A browser-based **AI-powered Code Editor** inspired by VS Code that allows developers to create, edit, run, and preview full-stack applications directly in the browser without any local setup.

🚀 **Live Demo:** https://nova-code-editor-cyan.vercel.app

---

## ✨ Features

### 💻 Code Playground

- ✅ Multiple Starter Templates
  - React
  - Next.js
  - Express.js
  - Vue.js
  - Hono
  - Angular
- ✅ Monaco Editor
- ✅ Syntax Highlighting
- ✅ File Explorer
- ✅ Create / Rename / Delete Files
- ✅ Auto Save
- ✅ Live Preview
- ✅ Browser Terminal using WebContainers

---

### 🤖 AI Features

- ✅ AI Chat Assistant
- ✅ AI Code Completion
- ✅ Context-aware Suggestions
- ✅ Multiple AI Models (OpenRouter)

---

### 🔐 Authentication

- ✅ Google OAuth
- ✅ GitHub OAuth
- ✅ NextAuth v5
- ✅ JWT Session Strategy
- ✅ Protected Routes

---

### 💾 Database

- ✅ MongoDB Atlas
- ✅ Prisma ORM
- ✅ User-specific Projects
- ✅ Playground Persistence
- ✅ Star / Unstar Projects

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | Full Stack Framework |
| TypeScript | Type Safety |
| Prisma ORM | Database ORM |
| MongoDB Atlas | Database |
| NextAuth v5 | Authentication |
| Monaco Editor | Code Editor |
| WebContainers | Browser Runtime |
| xTerm.js | Browser Terminal |
| Tailwind CSS | Styling |
| OpenRouter AI | AI Chat & Code Completion |
| Lucide React | Icons |

---

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/kashishnaaz/Nova-Code-Editor.git
cd Nova-Code-Editor
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=

AUTH_SECRET=

AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

OPENROUTER_API_KEY=

SITE_URL=http://localhost:3000
AUTH_URL=http://localhost:3000
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Start Development Server

```bash
npm run dev
```

Open your browser:

```
http://localhost:3000
```

---

## 📂 Project Structure

```
Nova-Code-Editor
│
├── app
│   ├── api
│   │   ├── auth
│   │   ├── chat
│   │   ├── code-completion
│   │   └── template
│   │
│   ├── auth
│   ├── dashboard
│   └── playground
│
├── modules
│   ├── ai-chat
│   ├── auth
│   ├── dashboard
│   ├── playground
│   └── webcontainers
│
├── components
├── prisma
├── vibecode-starters
├── lib
└── public
```

---

## 🚀 Application Flow

```
User
 │
 ▼
Login (Google / GitHub)
 │
 ▼
Dashboard
 │
 ▼
Create Playground
 │
 ▼
Choose Template
 │
 ▼
Monaco Editor
 │
 ├── File Explorer
 ├── AI Chat
 ├── AI Code Completion
 ├── Browser Terminal
 └── Live Preview
```

---

## 📸 Screenshots

### Dashboard

> Add your dashboard screenshot here.

### Playground

> Add your editor screenshot here.

### AI Chat

> Add your AI chat screenshot here.

### Live Preview

> Add your preview screenshot here.

---

## 🌟 Key Features

- Browser-based Development Environment
- AI-powered Coding Assistant
- Real-time Code Completion
- Browser Terminal
- Live Preview
- Multiple Framework Templates
- Authentication System
- Persistent Projects
- Modern UI
- Responsive Design

---

## 🎯 Future Improvements

- AI Code Review
- AI Bug Detection
- AI Refactoring
- AI Explain Code
- Multi-file AI Editing
- Real-time Collaboration
- Deploy Projects from Playground

---

## 👨‍💻 Author

**Kashish Naaz**

GitHub: https://github.com/kashishnaaz

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
