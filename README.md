# Taskly API - Task Management System

## Overview
Taskly is a robust task management API that allows users to create, organize, and track tasks with notes. Built with TypeScript, Express, and TypeORM, it features a complete CRUD for tasks and notes, with advanced filtering, pagination, and validation.

## Technologies

### Core Stack
- **Backend**: Node.js + Express ^5.1.0
- **Database**: MySQL (via mysql2 ^3.14.0)
- **ORM**: TypeORM 0.3.22
- **Validation**: Zod ^3.24.2

### Development Tools
- **Language**: TypeScript ^5.8.3
- **Linting**: ESLint ^9.24.0 + Prettier ^3.5.3
- **Hot Reload**: Nodemon ^3.1.9 + ts-node ^10.9.2

## Installation

### 1. Clone Repository
```bash
git clone git@github.com:Marcosschwaab/ANMAR25_DSUP_TASKLY.git
cd ANMAR25_DSUP_TASKLY
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Database
```bash
docker-compose -f ./docker/docker-compose.yml up -d
```

### 4. Run Migrations
```bash
npm run migration:run
```

### 5. Start Application
```bash
npm run start
```

## API Endpoints

### Tasks

#### Get All Tasks (with filters)
```
GET /tasks
```
Here are detailed examples of how to use each query parameter in the `GET /tasks` endpoint, including combinations and explanations:

---

### **1. Basic Pagination**
```http
GET /tasks?page=2&limit=3
```
**Explanation**:  
- Returns the 2nd page with 3 tasks per page  
**Response**:
```json
{
  "count": 12,
  "pages": 4,
  "data": [
    {
      "id": 4,
      "title": "Login bug",
      "status": "todo",
      "...": "..."
    },
    /* 2 more tasks */
  ]
}
```

---

### **2. Status Filter**
```http
GET /tasks?status=in_progress
```
**Explanation**:  
- Returns only tasks with `in_progress` status  
**Response**:
```json
{
  "count": 5,
  "data": [
    {
      "id": 1,
      "title": "API Refactor",
      "status": "in_progress",
      "...": "..."
    }
    /* more tasks with same status */
  ]
}
```

---

### **3. Priority Filter**
```http
GET /tasks?priority=high
```
**Explanation**:  
- Returns only `high` priority tasks  
**Response**:
```json
{
  "count": 2,
  "data": [
    {
      "id": 3,
      "title": "Security fix",
      "priority": "high",
      "...": "..."
    }
  ]
}
```

---

### **4. Full-Text Search**
```http
GET /tasks?search=authentication
```
**Explanation**:  
- Searches for "authentication" in `title` or `description` (case insensitive)  
**Response**:
```json
{
  "count": 1,
  "data": [
    {
      "id": 5,
      "title": "Auth system",
      "description": "Implement JWT authentication",
      "...": "..."
    }
  ]
}
```

---

### **5. Combined Filters**
```http
GET /tasks?status=todo&priority=critical&category=backend&page=1
```
**Explanation**:  
- Returns `todo` + `critical` + `backend` tasks (with optional pagination)  
**Response**:
```json
{
  "count": 1,
  "data": [
    {
      "id": 7,
      "title": "Data leak fix",
      "status": "todo",
      "priority": "critical",
      "category": "backend",
      "...": "..."
    }
  ]
}
```

---

### **6. Default Sorting**
```http
GET /tasks
```
**Default behavior**:  
- Sorts by `created_at DESC` (newest first)  
**Response**:
```json
{
  "count": 15,
  "data": [
    {
      "id": 15,
      "title": "Newest task",
      "created_at": "2023-10-20T10:00:00Z",
      "...": "..."
    },
    /* tasks sorted by descending date */
  ]
}
```

---

### Valid Parameter Types:
| Parameter | Accepted Values |
|-----------|-----------------|
| `status` | `todo`, `in_progress`, `done` |
| `priority` | `low`, `medium`, `high`, `critical` |
| `category` | `anonymous`, `backend`, `frontend`, `design`, `devops` |
| `search` | Any string (text search) |
| `page` | Integers > 0 |
| `limit` | Integers > 0 (default: 5) |

**Pro Tip**: Combine parameters for precise queries like:  
`/tasks?search=bug&status=done&priority=high`

#### Create Task
```
POST /tasks
```
**Request Body:**
```json
{
  "title": "New Feature",
  "description": "Implement user dashboard",
  "status": "todo",
  "priority": "medium",
  "category": "frontend"
}
```

**Success Response (201):**
```json
{
  "id": 2,
  "title": "New Feature",
  "description": "Implement user dashboard",
  "status": "todo",
  "priority": "medium",
  "category": "frontend",
  "created_at": "2023-10-15T11:30:00Z",
  "updated_at": null
}
```

### Notes

#### Add Note to Task
```
POST /tasks/:taskId/notes
```
**Request Body:**
```json
{
  "content": "This is an important note"
}
```

**Success Response (201):**
```json
{
  "id": 1,
  "content": "This is an important note",
  "task": {
    "id": 2,
    "title": "New Feature"
  },
  "created_at": "2023-10-15T12:00:00Z",
  "updated_at": null
}
```

#### Get Task Notes
```
GET /tasks/:taskId/notes
```
**Success Response:**
```json
[
  {
    "id": 1,
    "content": "First note",
    "created_at": "2023-10-15T12:00:00Z"
  },
  {
    "id": 2,
    "content": "Second note",
    "created_at": "2023-10-15T12:30:00Z"
  }
]
```

## Entity Models

### Task
```typescript
{
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'anonymous' | 'backend' | 'frontend' | 'design' | 'devops';
  notes: Note[];
  created_at: Date;
  updated_at: Date | null;
}
```

### Note
```typescript
{
  id: number;
  content: string;
  task: Task;
  created_at: Date;
  updated_at: Date | null;
}
```

## Error Responses

All error responses follow this format:
```json
{
  "message": "Descriptive error message",
  "statusCode": 400
}
```

Common status codes:
- 400: Validation errors
- 404: Resource not found
- 500: Server error

## License
ISC License
