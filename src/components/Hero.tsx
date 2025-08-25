import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import heroStudents from "@/assets/hero-students.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroStudents})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Discover Your Dream
            <span className="block text-accent-foreground">University Abroad</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Explore thousands of international universities and find the perfect program 
            for your academic journey. Your future starts here.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 p-2 bg-background/95 backdrop-blur-md rounded-lg shadow-card">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  placeholder="Search universities, programs, or locations..."
                  className="pl-10 border-0 bg-transparent focus:ring-0"
                />
              </div>
              <Link to="/select-country">
                <Button variant="default" size="lg" className="md:w-auto w-full">
                  Explore Now
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-primary-foreground/90">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6" />
              <span className="text-lg font-medium">2,500+ Universities</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              <span className="text-lg font-medium">50+ Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="w-6 h-6" />
              <span className="text-lg font-medium">10,000+ Programs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;