# My Backend

A small Express + SQLite API for the skills list in my React app.

## Endpoints

- `GET /api/skills` returns all skills
- `POST /api/skills` adds a skill (body: `{ "name": "Git" }`)
- `DELETE /api/skills/:name` removes a skill

## Run it

1. Install dependencies: `npm install`
2. Start the server: `node server.js`
3. Open http://localhost:3001/api/skills

Requires Node.js 22 or newer.