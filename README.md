# Taskly API - Task Management System

## Overview
Taskly is a robust task management API that allows users to create, organize, and track tasks with notes. Built with TypeScript, Express, and TypeORM, it features a complete CRUD for tasks and notes, with advanced filtering, pagination, and validation.

## Technologies

### Core Stack
- **Backend**: Node.js v23.6.1 + Express v5.1.0
- **Database**: MySQL8 (via mysql2 v3.14.0)
- **ORM**: TypeORM v0.3.22
- **Validation**: Zod v3.24.2
- **Others**: Cors v2.8.5, dotenv v16.5.0, reflect-metadata v0.2.2

### Development Tools
- **Language**: TypeScript v5.8.3
- **Linting**: ESLint v9.24.0 + Prettier v3.5.3
- **Hot Reload**: Nodemon v3.1.9 + ts-node v10.9.2

## Installation

###  Clone Repository
```bash
git clone git@github.com:Marcosschwaab/ANMAR25_DSUP_TASKLY.git
cd ANMAR25_DSUP_TASKLY
```

###  Environment configure (.env)
Rename the `.env.example` file to `.env` and configure the database credentials:
**.env.example**
```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME= your_user
DATABASE_PASSWORD= your_password
DATABASE_NAME=taskly
PORT=3000
```

---

## Environment Variables Reference

| Variable | Description | Default Value | Required |
|----------|-------------|---------------|----------|
| `DATABASE_HOST` | Database server host | `localhost` | Yes |
| `DATABASE_PORT` | Database server port | `3306` | Yes |
| `DATABASE_USERNAME` | Database username | - | Yes |
| `DATABASE_PASSWORD` | Database password | - | Yes |
| `DATABASE_NAME` | Database name | `taskly` | Yes |
| `PORT` | Application port | `3000` | No |


### . Install Dependencies
```bash
npm install
```

### . Start Database
```bash
docker-compose -f ./docker/docker-compose.yml up -d
```

### . Run Migrations
```bash
npm run migration:run
```

### . Start Application
```bash
npm run start
```

## API Endpoints

### Tasks

#### Get All Tasks (with filters)
```
GET /tasks
```

**Example Response:**
```json
{
  "count": 12,
  "pages": 3,
  "data": [
    {
      "id": 1,
      "title": "Fix authentication",
      "description": "Implement JWT auth",
      "status": "in_progress",
      "priority": "high",
      "category": "backend",
      "created_at": "2023-10-15T10:00:00Z"
    }
  ]
}
```

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

### **. Basic Pagination**
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

### **. Status Filter**
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

### **. Priority Filter**
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

### **. Full-Text Search**
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

### **. Combined Filters**
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

### **. Default Sorting**
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