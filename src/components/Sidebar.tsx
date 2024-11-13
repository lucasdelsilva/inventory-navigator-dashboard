import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Package2, BarChart3, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Button } from './ui/button';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: 'Inventory', href: '/inventory', icon: Package2, allowedRoles: ['ADMIN', 'EMPLOYEE'] },
    { name: 'Finance', href: '/finance', icon: BarChart3, allowedRoles: ['ADMIN'] },
    { name: 'Settings', href: '/settings', icon: Settings, allowedRoles: ['ADMIN'] },
  ].filter(item => item.allowedRoles.includes(user?.role || ''));

  return (
    <div className={cn(
      "h-screen fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out",
      expanded ? "w-64" : "w-20",
      "bg-background border-r"
    )}>
      <div className="flex h-16 items-center justify-between px-4">
        {expanded && <span className="text-xl font-semibold">Logistics</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="ml-auto"
        >
          {expanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="space-y-1 px-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              location.pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground",
              !expanded && "justify-center"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {expanded && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;