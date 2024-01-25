import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import TaskTable from '../components/tasks/TaskTable';
import { tasks } from '../data/mockData';

function renderTaskTable(taskList = tasks, loading = false) {
  return render(
    <MemoryRouter>
      <TaskTable tasks={taskList} loading={loading} />
    </MemoryRouter>
  );
}

describe('TaskTable', () => {
  it('renders all tasks initially', () => {
    renderTaskTable();
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(tasks.length + 1);
  });

  it('shows loading state', () => {
    renderTaskTable([], true);
    expect(screen.getByRole('status')).toHaveTextContent(/loading/i);
  });

  it('shows empty state when no tasks match filters', async () => {
    const user = userEvent.setup();
    renderTaskTable();

    const searchInput = screen.getByLabelText(/search tasks/i);
    await user.type(searchInput, 'xyznonexistent');

    expect(screen.getByText(/no tasks match/i)).toBeInTheDocument();
  });

  it('filters tasks by search term', async () => {
    const user = userEvent.setup();
    renderTaskTable();

    const searchInput = screen.getByLabelText(/search tasks/i);
    await user.type(searchInput, 'landing page');

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(2);
  });

  it('filters tasks by status', async () => {
    const user = userEvent.setup();
    renderTaskTable();

    const statusSelect = screen.getByLabelText(/filter tasks by status/i);
    await user.selectOptions(statusSelect, 'done');

    const rows = screen.getAllByRole('row');
    const doneTasks = tasks.filter((t) => t.status === 'done');
    expect(rows.length).toBe(doneTasks.length + 1);
  });

  it('selects and deselects individual tasks', async () => {
    const user = userEvent.setup();
    renderTaskTable();

    const firstCheckbox = screen.getAllByRole('checkbox')[1];
    await user.click(firstCheckbox);

    expect(screen.getByText(/1 task selected/i)).toBeInTheDocument();

    await user.click(firstCheckbox);
    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
  });

  it('select all toggles all visible tasks', async () => {
    const user = userEvent.setup();
    renderTaskTable();

    const selectAllCheckbox = screen.getByRole('checkbox', { name: /select all/i });
    await user.click(selectAllCheckbox);

    expect(screen.getByText(new RegExp(`${tasks.length} tasks selected`, 'i'))).toBeInTheDocument();

    await user.click(selectAllCheckbox);
    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
  });

  it('preserves selected rows when search filter changes', async () => {
    const user = userEvent.setup();
    renderTaskTable();

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);
    await user.click(checkboxes[2]);

    expect(screen.getByText(/2 tasks selected/i)).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    const selectedRow1 = rows[1];
    const selectedRow2 = rows[2];
    const selectedTitle1 = selectedRow1.querySelector('.task-title')?.textContent;
    const selectedTitle2 = selectedRow2.querySelector('.task-title')?.textContent;

    const searchInput = screen.getByLabelText(/search tasks/i);
    await user.type(searchInput, 'e');

    const filteredRows = screen.getAllByRole('row');
    const selectedRowsAfter = filteredRows.filter((row) =>
      row.classList.contains('selected')
    );

    expect(selectedRowsAfter.length).toBe(2);

    const selectedTitlesAfter = selectedRowsAfter.map(
      (row) => row.querySelector('.task-title')?.textContent
    );
    expect(selectedTitlesAfter).toContain(selectedTitle1);
    expect(selectedTitlesAfter).toContain(selectedTitle2);
  });

  it('preserves selected rows when status filter changes', async () => {
    const user = userEvent.setup();
    renderTaskTable();

    const sortedTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title));

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);

    expect(screen.getByText(/1 task selected/i)).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    const selectedRow = rows[1];
    const selectedTitle = selectedRow.querySelector('.task-title')?.textContent;
    const selectedTask = sortedTasks[0];

    const statusSelect = screen.getByLabelText(/filter tasks by status/i);
    await user.selectOptions(statusSelect, selectedTask.status);

    expect(screen.getByText(/1 task selected/i)).toBeInTheDocument();

    const filteredRows = screen.getAllByRole('row');
    const selectedRowsAfter = filteredRows.filter((row) =>
      row.classList.contains('selected')
    );
    expect(selectedRowsAfter.length).toBe(1);
    expect(selectedRowsAfter[0].querySelector('.task-title')?.textContent).toBe(selectedTitle);
  });

  it('preserves selected rows after filter removes non-selected items', async () => {
    const user = userEvent.setup();
    renderTaskTable();

    const sortedTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title));
    const inProgressTasks = sortedTasks.filter((t) => t.status === 'in-progress');
    const checkboxes = screen.getAllByRole('checkbox');

    for (let i = 0; i < sortedTasks.length; i++) {
      if (sortedTasks[i].status === 'in-progress') {
        await user.click(checkboxes[i + 1]);
      }
    }

    expect(screen.getByText(new RegExp(`${inProgressTasks.length} tasks selected`, 'i'))).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    const selectedTitlesBefore = rows
      .filter((row) => row.classList.contains('selected'))
      .map((row) => row.querySelector('.task-title')?.textContent);

    const statusSelect = screen.getByLabelText(/filter tasks by status/i);
    await user.selectOptions(statusSelect, 'in-progress');

    expect(screen.getByText(new RegExp(`${inProgressTasks.length} tasks selected`, 'i'))).toBeInTheDocument();

    const filteredRows = screen.getAllByRole('row');
    const selectedRowsAfter = filteredRows.filter((row) =>
      row.classList.contains('selected')
    );
    const selectedTitlesAfter = selectedRowsAfter.map(
      (row) => row.querySelector('.task-title')?.textContent
    );

    expect(selectedTitlesAfter).toEqual(selectedTitlesBefore);
  });
});
