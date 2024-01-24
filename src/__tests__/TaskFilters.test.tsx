import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskFilters from '../components/tasks/TaskFilters';

const defaultProps = {
  search: '',
  status: 'all' as const,
  sortBy: 'title' as const,
  sortOrder: 'asc' as const,
  onSearchChange: vi.fn(),
  onStatusChange: vi.fn(),
  onSortByChange: vi.fn(),
  onToggleSortOrder: vi.fn(),
};

describe('TaskFilters', () => {
  it('renders search input', () => {
    render(<TaskFilters {...defaultProps} />);
    expect(screen.getByLabelText(/search tasks/i)).toBeInTheDocument();
  });

  it('renders status filter', () => {
    render(<TaskFilters {...defaultProps} />);
    expect(screen.getByLabelText(/filter tasks by status/i)).toBeInTheDocument();
  });

  it('renders sort controls', () => {
    render(<TaskFilters {...defaultProps} />);
    expect(screen.getByLabelText(/sort tasks/i)).toBeInTheDocument();
  });

  it('calls onSearchChange when typing in search', async () => {
    const onSearchChange = vi.fn();
    const user = userEvent.setup();
    render(<TaskFilters {...defaultProps} onSearchChange={onSearchChange} />);

    const searchInput = screen.getByLabelText(/search tasks/i);
    await user.type(searchInput, 'test');

    expect(onSearchChange).toHaveBeenCalled();
  });

  it('calls onStatusChange when selecting status', async () => {
    const onStatusChange = vi.fn();
    const user = userEvent.setup();
    render(<TaskFilters {...defaultProps} onStatusChange={onStatusChange} />);

    const statusSelect = screen.getByLabelText(/filter tasks by status/i);
    await user.selectOptions(statusSelect, 'done');

    expect(onStatusChange).toHaveBeenCalledWith('done');
  });

  it('calls onSortByChange when selecting sort option', async () => {
    const onSortByChange = vi.fn();
    const user = userEvent.setup();
    render(<TaskFilters {...defaultProps} onSortByChange={onSortByChange} />);

    const sortSelect = screen.getByLabelText(/sort tasks/i);
    await user.selectOptions(sortSelect, 'priority');

    expect(onSortByChange).toHaveBeenCalledWith('priority');
  });

  it('calls onToggleSortOrder when clicking sort order button', async () => {
    const onToggleSortOrder = vi.fn();
    const user = userEvent.setup();
    render(<TaskFilters {...defaultProps} onToggleSortOrder={onToggleSortOrder} />);

    const sortButton = screen.getByRole('button', { name: /sort/i });
    await user.click(sortButton);

    expect(onToggleSortOrder).toHaveBeenCalled();
  });
});
