import { Project } from '../../types';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
}

export default function ProjectList({ projects, loading }: ProjectListProps) {
  if (loading) {
    return <div className="loading" role="status">Loading projects...</div>;
  }

  if (projects.length === 0) {
    return <div className="empty-state">No projects found</div>;
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
