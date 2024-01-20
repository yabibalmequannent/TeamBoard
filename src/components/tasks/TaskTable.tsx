import { Task } from '../../types';
import TaskRow from './TaskRow';
import TaskFilters from './TaskFilters';
import { useTaskFilter } from '../../hooks/useTaskFilter';

interface TaskTableProps {
  tasks: Task[];
  loading: boolean;
}

export default function TaskTable({ tasks, loading }: TaskTableProps) {
  const {
    filter,
    filteredTasks,
    selectedIds,
    setSearch,
    setStatus,
    setSortBy,
    toggleSortOrder,
    toggleSelectAll,
    toggleSelect,
  } = useTaskFilter({ tasks });

  if (loading) {
    return <div className="loading" role="status">Loading tasks...</div>;
  }

  const allSelected = filteredTasks.length > 0 && selectedIds.size === filteredTasks.length;

  return (
    <div className="task-table-container">
      <TaskFilters
        search={filter.search}
        status={filter.status}
        sortBy={filter.sortBy}
        sortOrder={filter.sortOrder}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onSortByChange={setSortBy}
        onToggleSortOrder={toggleSortOrder}
      />
      <div className="selection-info" aria-live="polite">
        {selectedIds.size > 0 && (
          <span>{selectedIds.size} task{selectedIds.size !== 1 ? 's' : ''} selected</span>
        )}
      </div>
      <table className="task-table" role="grid" aria-label="Task list">
        <thead>
          <tr>
            <th>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  aria-label="Select all tasks"
                  className="checkbox-input"
                />
                <span className="checkbox-custom" />
              </label>
            </th>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col">Priority</th>
            <th scope="col">Assignee</th>
            <th scope="col">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-state">No tasks match your filters</td>
            </tr>
          ) : (
            filteredTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                isSelected={selectedIds.has(task.id)}
                onSelect={toggleSelect}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
