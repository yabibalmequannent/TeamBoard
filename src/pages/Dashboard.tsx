import { useProjects } from '../hooks/useProjects';
import ProjectList from '../components/projects/ProjectList';
import Header from '../components/layout/Header';

export default function Dashboard() {
  const { projects, loading } = useProjects();

  const activeProjects = projects.filter((p) => p.status === 'active');
  const totalTasks = projects.reduce((sum, p) => sum + p.taskCount, 0);
  const completedTasks = projects.reduce((sum, p) => sum + p.completedCount, 0);

  return (
    <div className="page">
      <Header title="Dashboard" />
      <div className="page-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-value">{activeProjects.length}</h3>
            <p className="stat-label">Active Projects</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-value">{totalTasks}</h3>
            <p className="stat-label">Total Tasks</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-value">{completedTasks}</h3>
            <p className="stat-label">Completed Tasks</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-value">{totalTasks - completedTasks}</h3>
            <p className="stat-label">Remaining Tasks</p>
          </div>
        </div>
        <section className="section">
          <h2 className="section-title">Projects</h2>
          <ProjectList projects={projects} loading={loading} />
        </section>
      </div>
    </div>
  );
}

// Empty state handling
