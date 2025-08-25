import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Star, Calendar } from "lucide-react";
import universityShowcase from "@/assets/university-showcase.jpg";

const universities = [
  {
    id: 1,
    name: "Harvard University",
    location: "Cambridge, USA",
    image: universityShowcase,
    ranking: "#1 Global",
    students: "23,000+",
    rating: 4.9,
    programs: ["Business", "Medicine", "Law", "Engineering"],
    deadline: "Dec 1, 2024",
    tuition: "$54,880/year"
  },
  {
    id: 2,
    name: "University of Oxford",
    location: "Oxford, UK",
    image: universityShowcase,
    ranking: "#2 Global",
    students: "26,000+",
    rating: 4.8,
    programs: ["Philosophy", "Literature", "Medicine", "Sciences"],
    deadline: "Oct 15, 2024",
    tuition: "£28,370/year"
  },
  {
    id: 3,
    name: "MIT",
    location: "Cambridge, USA",
    image: universityShowcase,
    ranking: "#3 Global",
    students: "11,000+",
    rating: 4.9,
    programs: ["Engineering", "Computer Science", "Physics"],
    deadline: "Jan 1, 2025",
    tuition: "$57,986/year"
  }
];

const FeaturedUniversities = () => {
  return (
    <section id="universities" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Featured Universities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover world-renowned institutions offering exceptional educational experiences
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((university) => (
            <Card key={university.id} className="group shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={university.image}
                  alt={university.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 text-primary font-semibold">
                    {university.ranking}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/90 rounded-full px-2 py-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{university.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {university.name}
                </h3>
                
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{university.location}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{university.students} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{university.deadline}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {university.programs.slice(0, 3).map((program) => (
                      <Badge key={program} variant="outline" className="text-xs">
                        {program}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {university.tuition}
                  </span>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="default" size="lg">
            View All Universities
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;