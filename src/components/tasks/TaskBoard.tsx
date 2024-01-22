import { Task, TaskStatus } from '../../types';
import Badge from '../ui/Badge';
import { members } from '../../data/mockData';

interface TaskBoardProps {
  tasks: Task[];
}

const columns: { status: TaskStatus; label: string }[] = [
  { status: 'todo', label: 'To Do' },
  { status: 'in-progress', label: 'In Progress' },
  { status: 'done', label: 'Done' },
];

const priorityVariant: Record<string, 'danger' | 'warning' | 'default'> = {
  high: 'danger',
  medium: 'warning',
  low: 'default',
};

export default function TaskBoard({ tasks }: TaskBoardProps) {
  return (
    <div className="task-board" role="region" aria-label="Task board">
      {columns.map((column) => {
        const columnTasks = tasks.filter((t) => t.status === column.status);
        return (
          <div key={column.status} className="board-column" role="group" aria-label={`${column.label} tasks`}>
            <h3 className="board-column-header">
              {column.label}
              <span className="board-count">{columnTasks.length}</span>
            </h3>
            <div className="board-cards">
              {columnTasks.map((task) => {
                const assignee = members.find((m) => m.id === task.assigneeId);
                return (
                  <article key={task.id} className="board-card" data-testid={`board-card-${task.id}`}>
                    <h4 className="board-card-title">{task.title}</h4>
                    <p className="board-card-description">{task.description}</p>
                    <div className="board-card-footer">
                      <Badge variant={priorityVariant[task.priority]}>
                        {task.priority}
                      </Badge>
                      {assignee && (
                        <span className="board-card-assignee" title={assignee.name}>
                          {assignee.avatar}
                        </span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
