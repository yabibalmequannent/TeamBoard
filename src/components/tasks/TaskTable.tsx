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
    selectedIndexes,
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

  const allSelected = filteredTasks.length > 0 && selectedIndexes.length === filteredTasks.length;

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
        {selectedIndexes.length > 0 && (
          <span>{selectedIndexes.length} task{selectedIndexes.length !== 1 ? 's' : ''} selected</span>
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
            filteredTasks.map((task, index) => (
              <TaskRow
                key={task.id}
                task={task}
                index={index}
                isSelected={selectedIndexes.includes(index)}
                onSelect={toggleSelect}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
