# Create a REST API Route

Create a Next.js App Router API route at `app/api/todos/route.ts` that implements a simple in-memory TODO CRUD API.

## Requirements

- **GET /api/todos** — Returns all todos as JSON array
- **POST /api/todos** — Creates a new todo. Accepts `{ "title": string }` in the request body. Returns the created todo with a generated `id` and `completed: false`.
- **PUT /api/todos** — Updates a todo. Accepts `{ "id": number, "title"?: string, "completed"?: boolean }`. Returns the updated todo.
- **DELETE /api/todos** — Deletes a todo. Accepts `{ "id": number }`. Returns `{ "success": true }`.

Each todo should have the shape: `{ id: number, title: string, completed: boolean }`

Return appropriate status codes (200 for success, 400 for bad request, 404 for not found).
