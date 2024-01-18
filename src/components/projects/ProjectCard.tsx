import { Project } from '../../types';
import Badge from '../ui/Badge';

interface ProjectCardProps {
  project: Project;
}

const statusVariant: Record<string, 'success' | 'warning' | 'info'> = {
  active: 'success',
  completed: 'info',
  archived: 'warning',
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const progress = project.taskCount > 0
    ? Math.round((project.completedCount / project.taskCount) * 100)
    : 0;

  return (
    <article className="project-card" data-testid={`project-${project.id}`}>
      <div className="project-card-header">
        <h3 className="project-card-title">{project.name}</h3>
        <Badge variant={statusVariant[project.status]}>
          {project.status}
        </Badge>
      </div>
      <p className="project-card-description">{project.description}</p>
      <div className="project-card-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${progress}% complete`}
          />
        </div>
        <span className="progress-text">
          {project.completedCount}/{project.taskCount} tasks
        </span>
      </div>
    </article>
  );
}
