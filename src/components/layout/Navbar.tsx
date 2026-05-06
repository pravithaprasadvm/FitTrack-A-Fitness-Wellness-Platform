import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || !isLandingPage
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">FitTrack</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/feature" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link to="/works" className="text-sm font-medium hover:text-primary transition-colors">How it Works</Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/onboarding" className="text-sm font-medium hover:text-primary transition-colors">Sign In</Link>
          <Link to="/onboarding">
            <Button>Get Started Free</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link to="/feature" className="text-base font-medium p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link to="/works" className="text-base font-medium p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>How it Works</Link>
              <Link to="/pricing" className="text-base font-medium p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              <div className="h-px bg-border my-2" />
              <Link to="/onboarding" className="text-base font-medium p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              <Link to="/onboarding" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mt-2">Get Started Free</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
