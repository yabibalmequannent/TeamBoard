import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { fetchTasks } from '../data/mockData';
import { Task } from '../types';
import { useEffect } from 'react';
import Header from '../components/layout/Header';
import TaskTable from '../components/tasks/TaskTable';
import TaskBoard from '../components/tasks/TaskBoard';

type ViewMode = 'table' | 'board';

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects } = useProjects();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    if (!projectId) return;
    let cancelled = false;
    setLoading(true);
    fetchTasks(projectId).then((data) => {
      if (!cancelled) {
        setTasks(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return (
    <div className="page">
      <Header title={project?.name || 'Project'} />
      <div className="page-content">
        <div className="view-toggle" role="tablist" aria-label="View mode">
          <button
            role="tab"
            aria-selected={viewMode === 'table'}
            onClick={() => setViewMode('table')}
            className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
          >
            Table
          </button>
          <button
            role="tab"
            aria-selected={viewMode === 'board'}
            onClick={() => setViewMode('board')}
            className={`view-toggle-btn ${viewMode === 'board' ? 'active' : ''}`}
          >
            Board
          </button>
        </div>
        {viewMode === 'table' ? (
          <TaskTable tasks={tasks} loading={loading} />
        ) : (
          <TaskBoard tasks={tasks} />
        )}
      </div>
    </div>
  );
}
