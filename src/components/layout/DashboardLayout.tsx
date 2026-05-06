import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, Utensils, BarChart, Settings, LogOut, Bell, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Activity, label: 'Workouts', href: '' },
  { icon: Utensils, label: 'Nutrition', href: '' },
  { icon: BarChart, label: 'Progress', href: '' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const [dark, setDark] = useState(true);

  // Optional: persist theme
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setDark(saved === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className={cn(
      "flex min-h-screen transition-colors duration-300",
      dark ? "dark bg-[#020817]" : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    )}>

      {/* Sidebar */}
      <aside className={cn(
        "hidden md:flex w-64 flex-col border-r px-4 py-6 fixed inset-y-0 left-0 z-10",
        dark
          ? "bg-[#020817] border-white/10 text-white"
          : "bg-white/70 backdrop-blur-xl border-white/40 text-gray-800"
      )}>

        <div className="flex items-center gap-2 px-2 mb-10">
          <Activity className={cn("h-6 w-6", dark ? "text-blue-400" : "text-indigo-600")} />
          <span className="text-xl font-bold">FitTrack</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm",
                  isActive
                    ? dark
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-indigo-100 text-indigo-600"
                    : dark
                      ? "text-gray-400 hover:bg-white/5 hover:text-white"
                      : "text-gray-500 hover:bg-white hover:text-indigo-600"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-2 pt-8 border-t border-white/10">
          <Link to="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/5">
            <Settings className="h-5 w-5" />
            Settings
          </Link>

          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-500/10 text-sm">
            <LogOut className="h-5 w-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-0">

        {/* Header */}
        <header className={cn(
          "h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 border-b",
          dark
            ? "bg-[#020817] border-white/10 text-white"
            : "bg-white/70 backdrop-blur-xl border-white/40 text-gray-800"
        )}>

          <div className="flex items-center gap-4 ml-auto">

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDark(!dark)}
              className="hover:bg-white/10"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
              <img src="https://i.pravatar.cc/150?img=33" alt="User" />
            </div>

          </div>
        </header>

        {/* Content */}
        <div className={cn(
          "p-4 md:p-8 min-h-screen transition-colors",
          dark ? "bg-[#020817] text-white" : "text-gray-800"
        )}>
          {children}
        </div>

      </main>

      {/* Mobile Nav */}
      <nav className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 h-16 flex items-center justify-around z-50",
        dark ? "bg-[#020817] border-t border-white/10 text-white" : "bg-white border-t"
      )}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.href} to={item.href} className={cn(
              "flex flex-col items-center text-xs",
              isActive ? "text-primary" : "opacity-60"
            )}>
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

    </div>
  );
}