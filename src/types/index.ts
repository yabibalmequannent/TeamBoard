export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type ProjectStatus = 'active' | 'archived' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  projectId: string;
  assigneeId: string | null;
  createdAt: string;
  dueDate: string | null;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  taskCount: number;
  completedCount: number;
  createdAt: string;
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
  role: string;
}
