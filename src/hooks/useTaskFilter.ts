import { useState, useMemo } from 'react';
import { Task, TaskStatus } from '../types';

interface UseTaskFilterOptions {
  tasks: Task[];
}

interface TaskFilterState {
  search: string;
  status: TaskStatus | 'all';
  sortBy: 'title' | 'priority' | 'status' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export function useTaskFilter({ tasks }: UseTaskFilterOptions) {
  const [filter, setFilter] = useState<TaskFilterState>({
    search: '',
    status: 'all',
    sortBy: 'title',
    sortOrder: 'asc',
  });

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const setSearch = (search: string) => {
    setFilter((prev) => ({ ...prev, search }));
  };

  const setStatus = (status: TaskStatus | 'all') => {
    setFilter((prev) => ({ ...prev, status }));
  };

  const setSortBy = (sortBy: TaskFilterState['sortBy']) => {
    setFilter((prev) => ({ ...prev, sortBy }));
  };

  const toggleSortOrder = () => {
    setFilter((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Filter by search
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by status
    if (filter.status !== 'all') {
      result = result.filter((task) => task.status === filter.status);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (filter.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'priority': {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        }
        case 'status': {
          const statusOrder = { 'todo': 0, 'in-progress': 1, 'done': 2 };
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        }
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      return filter.sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [tasks, filter]);

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredTasks.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredTasks.map((t) => t.id)));
    }
  };

  const toggleSelect = (taskId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  return {
    filter,
    filteredTasks,
    selectedIds,
    setSearch,
    setStatus,
    setSortBy,
    toggleSortOrder,
    toggleSelectAll,
    toggleSelect,
    clearSelection,
  };
}
