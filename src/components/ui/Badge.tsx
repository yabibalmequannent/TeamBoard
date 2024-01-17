interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

const variantStyles: Record<string, string> = {
  default: 'badge-default',
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
  info: 'badge-info',
};

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`badge ${variantStyles[variant]}`}>
      {children}
    </span>
  );
}
