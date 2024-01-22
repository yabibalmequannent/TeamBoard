import { Task } from '../../types';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { members } from '../../data/mockData';

interface TaskDrawerProps {
  task: Task | null;
  onClose: () => void;
}

const statusVariant: Record<string, 'success' | 'warning' | 'info'> = {
  'todo': 'info',
  'in-progress': 'warning',
  'done': 'success',
};

const statusLabel: Record<string, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
};

export default function TaskDrawer({ task, onClose }: TaskDrawerProps) {
  if (!task) return null;

  const assignee = members.find((m) => m.id === task.assigneeId);

  return (
    <div className="drawer-overlay" onClick={onClose} role="dialog" aria-label="Task details">
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2 className="drawer-title">Task Details</h2>
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="Close task details"
          >
            ×
          </Button>
        </div>
        <div className="drawer-body">
          <h3>{task.title}</h3>
          <div className="drawer-meta">
            <div className="drawer-meta-item">
              <span className="meta-label">Status</span>
              <Badge variant={statusVariant[task.status]}>
                {statusLabel[task.status]}
              </Badge>
            </div>
            <div className="drawer-meta-item">
              <span className="meta-label">Priority</span>
              <span className="meta-value">{task.priority}</span>
            </div>
            <div className="drawer-meta-item">
              <span className="meta-label">Assignee</span>
              <span className="meta-value">{assignee ? assignee.name : 'Unassigned'}</span>
            </div>
            <div className="drawer-meta-item">
              <span className="meta-label">Created</span>
              <span className="meta-value">{task.createdAt}</span>
            </div>
            <div className="drawer-meta-item">
              <span className="meta-label">Due Date</span>
              <span className="meta-value">{task.dueDate || 'No due date'}</span>
            </div>
          </div>
          <div className="drawer-description">
            <h4>Description</h4>
            <p>{task.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
