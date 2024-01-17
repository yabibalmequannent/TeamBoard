import ThemeToggle from '../ui/ThemeToggle';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'Dashboard' }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-actions">
        <ThemeToggle />
      </div>
    </header>
  );
}
