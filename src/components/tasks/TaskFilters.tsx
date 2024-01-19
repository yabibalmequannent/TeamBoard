import { TaskStatus } from '../../types';

interface TaskFiltersProps {
  search: string;
  status: TaskStatus | 'all';
  sortBy: 'title' | 'priority' | 'status' | 'createdAt';
  sortOrder: 'asc' | 'desc';
  onSearchChange: (search: string) => void;
  onStatusChange: (status: TaskStatus | 'all') => void;
  onSortByChange: (sortBy: 'title' | 'priority' | 'status' | 'createdAt') => void;
  onToggleSortOrder: () => void;
}

export default function TaskFilters({
  search,
  status,
  sortBy,
  sortOrder,
  onSearchChange,
  onStatusChange,
  onSortByChange,
  onToggleSortOrder,
}: TaskFiltersProps) {
  return (
    <div className="task-filters" role="search" aria-label="Task filters">
      <div className="filter-group">
        <label htmlFor="task-search" className="filter-label">Search</label>
        <input
          id="task-search"
          type="search"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="filter-input"
          aria-label="Search tasks by title or description"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="task-status" className="filter-label">Status</label>
        <select
          id="task-status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value as TaskStatus | 'all')}
          className="filter-select"
          aria-label="Filter tasks by status"
        >
          <option value="all">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="task-sort" className="filter-label">Sort by</label>
        <select
          id="task-sort"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value as typeof sortBy)}
          className="filter-select"
          aria-label="Sort tasks"
        >
          <option value="title">Title</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
          <option value="createdAt">Created Date</option>
        </select>
        <button
          onClick={onToggleSortOrder}
          className="sort-order-btn"
          aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
          title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
    </div>
  );
}
