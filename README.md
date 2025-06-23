# AI Full-Stack Assessment

A minimal full-stack demo that lets you chat with an LLM (OpenAI) from a React frontend through an Express + TypeScript backend.
All conversations are persisted in MongoDB (Atlas).

---

Tech stack

| Layer        | Tech                                   |

| Frontend     | React 18 + Vite, TypeScript, Tailwind CSS |
| Backend      | Node 20, Express, TypeScript           |
| AI API       | OpenAI `chat.completions`              |
| DB           | MongoDB Atlas via Mongoose             |

---

# Local setup

```bash
git clone git@github.com:Arshitaramireddy/ai_fullstack_assessment.git
cd ai_fullstack_assessment

1.Backend:

cp backend/.env.example backend/.env   # fill in your own keys
cd backend
npm install
npm run dev

2.Frontend(new terminal)

cd frontend
npm install
npm run dev

API reference:

 Method  Endpoint              Description
 ------  --------------------  ---------------------------------
 POST    `/api/ask-ai`         Send a prompt, receive AI answer
 GET     `/api/conversations`  List stored chats (latest->oldest)
 DELETE  `/api/conversations`  Clear chat history



Sample requests:
# 1) Ask the AI
curl -X POST http://localhost:8000/api/ask-ai \
     -H "Content-Type: application/json" \
     -d '{"prompt":"Hello, AI"}'

# 2) Retrieve history
curl http://localhost:8000/api/conversations

# 3) Delete history
curl -X DELETE http://localhost:8000/api/conversations