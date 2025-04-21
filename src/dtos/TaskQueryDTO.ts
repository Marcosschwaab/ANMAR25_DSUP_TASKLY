export interface TaskQueryDTO {
    page?: number;
    limit?: number;
    search?: string;
    status?: 'todo' | 'in_progress' | 'done';
    priority?: 'low' | 'medium' | 'high' | 'critical';
    category?: 'anonymous' | 'backend' | 'frontend' | 'design' | 'devops';
  }
  