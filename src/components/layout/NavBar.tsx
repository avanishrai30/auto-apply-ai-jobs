
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui-components/ThemeToggle';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl gradient-text">MeOne by Avanish</span>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/profile" className="text-foreground hover:text-primary transition-colors">
              Profile
            </Link>
            <ThemeToggle />
            <Button className="btn-primary">Get Started</Button>
          </div>
          
          {/* Mobile navigation toggle */}
          <div className="flex items-center space-x-3 md:hidden">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/profile" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Button className="btn-primary w-full">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
