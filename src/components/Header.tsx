import { Button } from "@/components/ui/button";
import { Search, Globe, BookOpen, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              UniExplore
            </h1>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/universities" 
              className={`text-foreground hover:text-primary transition-colors ${
                location.pathname === '/universities' ? 'text-primary font-medium' : ''
              }`}
            >
              Universities
            </Link>
            <Link 
              to="/destinations" 
              className={`text-foreground hover:text-primary transition-colors ${
                location.pathname === '/destinations' ? 'text-primary font-medium' : ''
              }`}
            >
              Destinations
            </Link>
            <a href="#programs" className="text-foreground hover:text-primary transition-colors">
              Programs
            </a>
            <Link 
              to="/about" 
              className={`text-foreground hover:text-primary transition-colors ${
                location.pathname === '/about' ? 'text-primary font-medium' : ''
              }`}
            >
              About
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;