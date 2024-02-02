import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTaskFilter } from '../hooks/useTaskFilter';
import { tasks } from '../data/mockData';

describe('useTaskFilter', () => {
  it('returns all tasks initially', () => {
    const { result } = renderHook(() => useTaskFilter({ tasks }));
    expect(result.current.filteredTasks.length).toBe(tasks.length);
  });

  it('filters by search term', () => {
    const { result } = renderHook(() => useTaskFilter({ tasks }));

    act(() => {
      result.current.setSearch('landing');
    });

    const matching = tasks.filter((t) =>
      t.title.toLowerCase().includes('landing') ||
      t.description.toLowerCase().includes('landing')
    );
    expect(result.current.filteredTasks.length).toBe(matching.length);
  });

  it('filters by status', () => {
    const { result } = renderHook(() => useTaskFilter({ tasks }));

    act(() => {
      result.current.setStatus('done');
    });

    const doneTasks = tasks.filter((t) => t.status === 'done');
    expect(result.current.filteredTasks.length).toBe(doneTasks.length);
  });

  it('combines search and status filters', () => {
    const { result } = renderHook(() => useTaskFilter({ tasks }));

    act(() => {
      result.current.setSearch('api');
      result.current.setStatus('done');
    });

    const matching = tasks.filter(
      (t) =>
        t.status === 'done' &&
        (t.title.toLowerCase().includes('api') ||
          t.description.toLowerCase().includes('api'))
    );
    expect(result.current.filteredTasks.length).toBe(matching.length);
  });

  it('sorts by title ascending by default', () => {
    const { result } = renderHook(() => useTaskFilter({ tasks }));

    const titles = result.current.filteredTasks.map((t) => t.title);
    const sorted = [...titles].sort((a, b) => a.localeCompare(b));
    expect(titles).toEqual(sorted);
  });

  it('toggles sort order', () => {
    const { result } = renderHook(() => useTaskFilter({ tasks }));

    act(() => {
      result.current.toggleSortOrder();
    });

    const titles = result.current.filteredTasks.map((t) => t.title);
    const sorted = [...titles].sort((a, b) => b.localeCompare(a));
    expect(titles).toEqual(sorted);
  });

  it('selects and deselects tasks by id', () => {
    const { result } = renderHook(() => useTaskFilter({ tasks }));

    act(() => {
      result.current.toggleSelect(tasks[0].id);
    });
    expect(result.current.selectedIds.has(tasks[0].id)).toBe(true);

    act(() => {
      result.current.toggleSelect(tasks[1].id);
    });
    expect(result.current.selectedIds.size).toBe(2);

    act(() => {
      result.current.toggleSelect(tasks[0].id);
    });
    expect(result.current.selectedIds.size).toBe(1);
    expect(result.current.selectedIds.has(tasks[1].id)).toBe(true);
  });

  it('select all selects all filtered tasks', () => {
    const { result } = renderHook(() => useTaskFilter({ tasks }));

    act(() => {
      result.current.toggleSelectAll();
    });

    expect(result.current.selectedIds.size).toBe(result.current.filteredTasks.length);
  });

  it('clears selection', () => {
    const { result } = renderHook(() => useTaskFilter({ tasks }));

    act(() => {
      result.current.toggleSelect(tasks[0].id);
      result.current.toggleSelect(tasks[1].id);
    });

    act(() => {
      result.current.clearSelection();
    });

    expect(result.current.selectedIds.size).toBe(0);
  });

  it('selection by ID survives filter changes', () => {
    const { result } = renderHook(() => useTaskFilter({ tasks }));

    act(() => {
      result.current.toggleSelect(tasks[0].id);
      result.current.toggleSelect(tasks[1].id);
    });

    expect(result.current.selectedIds.size).toBe(2);

    act(() => {
      result.current.setStatus('in-progress');
    });

    expect(result.current.selectedIds.has(tasks[0].id)).toBe(true);
    expect(result.current.selectedIds.has(tasks[1].id)).toBe(true);
  });
});
