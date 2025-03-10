
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">CampusConnect</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">Home</Link>
              <Link to="/courses" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">Courses</Link>
              <Link to="/admissions" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">Admissions</Link>
              <Link to="/campus" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">Campus Life</Link>
              <Link to="/faculty" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">Faculty</Link>
              <Link to="/news" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">News</Link>
              <Link to="/contact" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-8 rounded-full bg-secondary"
              />
            </div>
            <ThemeToggle />
            <Button variant="default" size="sm" className="bg-primary text-white">
              Student Login
            </Button>
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base font-medium hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/courses" className="block px-3 py-2 text-base font-medium hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Courses</Link>
            <Link to="/admissions" className="block px-3 py-2 text-base font-medium hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Admissions</Link>
            <Link to="/campus" className="block px-3 py-2 text-base font-medium hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Campus Life</Link>
            <Link to="/faculty" className="block px-3 py-2 text-base font-medium hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Faculty</Link>
            <Link to="/news" className="block px-3 py-2 text-base font-medium hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>News</Link>
            <Link to="/contact" className="block px-3 py-2 text-base font-medium hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <div className="pt-2">
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-8 rounded-full bg-secondary"
                />
              </div>
              <Button className="w-full bg-primary text-white">
                Student Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
