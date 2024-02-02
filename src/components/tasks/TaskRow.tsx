import { Task } from '../../types';
import Badge from '../ui/Badge';
import Checkbox from '../ui/Checkbox';
import { members } from '../../data/mockData';

interface TaskRowProps {
  task: Task;
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
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

const priorityVariant: Record<string, 'danger' | 'warning' | 'default'> = {
  high: 'danger',
  medium: 'warning',
  low: 'default',
};

export default function TaskRow({ task, index, isSelected, onSelect }: TaskRowProps) {
  const assignee = members.find((m) => m.id === task.assigneeId);

  return (
    <tr className={`task-row ${isSelected ? 'selected' : ''}`} data-testid={`task-row-${task.id}`}>
      <td>
        <Checkbox
          checked={isSelected}
          onChange={() => onSelect(index)}
          id={`select-task-${task.id}`}
          label={`Select ${task.title}`}
        />
      </td>
      <td className="task-title">{task.title}</td>
      <td>
        <Badge variant={statusVariant[task.status]}>
          {statusLabel[task.status]}
        </Badge>
      </td>
      <td>
        <Badge variant={priorityVariant[task.priority]}>
          {task.priority}
        </Badge>
      </td>
      <td>{assignee ? assignee.name : 'Unassigned'}</td>
      <td>{task.dueDate || 'No due date'}</td>
    </tr>
  );
}
