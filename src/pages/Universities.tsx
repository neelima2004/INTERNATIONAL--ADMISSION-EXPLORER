import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Users, Star, Calendar, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import universityShowcase from "@/assets/university-showcase.jpg";

const universities = [
  {
    id: 1,
    name: "Harvard University",
    location: "Cambridge, USA",
    country: "United States",
    image: universityShowcase,
    ranking: "#1 Global",
    students: "23,000+",
    rating: 4.9,
    programs: ["Business", "Medicine", "Law", "Engineering"],
    deadline: "Dec 1, 2024",
    tuition: "$54,880/year",
    type: "Private",
    level: "Both"
  },
  {
    id: 2,
    name: "University of Oxford",
    location: "Oxford, UK",
    country: "United Kingdom",
    image: universityShowcase,
    ranking: "#2 Global",
    students: "26,000+",
    rating: 4.8,
    programs: ["Philosophy", "Literature", "Medicine", "Sciences"],
    deadline: "Oct 15, 2024",
    tuition: "£28,370/year",
    type: "Public",
    level: "Both"
  },
  {
    id: 3,
    name: "MIT",
    location: "Cambridge, USA",
    country: "United States",
    image: universityShowcase,
    ranking: "#3 Global",
    students: "11,000+",
    rating: 4.9,
    programs: ["Engineering", "Computer Science", "Physics"],
    deadline: "Jan 1, 2025",
    tuition: "$57,986/year",
    type: "Private",
    level: "Both"
  },
  {
    id: 4,
    name: "Stanford University",
    location: "Stanford, USA",
    country: "United States",
    image: universityShowcase,
    ranking: "#4 Global",
    students: "17,000+",
    rating: 4.8,
    programs: ["Business", "Engineering", "Computer Science", "Medicine"],
    deadline: "Jan 2, 2025",
    tuition: "$56,169/year",
    type: "Private",
    level: "Both"
  },
  {
    id: 5,
    name: "University of Cambridge",
    location: "Cambridge, UK",
    country: "United Kingdom", 
    image: universityShowcase,
    ranking: "#5 Global",
    students: "25,000+",
    rating: 4.7,
    programs: ["Mathematics", "Natural Sciences", "Engineering", "Medicine"],
    deadline: "Oct 15, 2024",
    tuition: "£25,734/year",
    type: "Public",
    level: "Both"
  },
  {
    id: 6,
    name: "University of Toronto",
    location: "Toronto, Canada",
    country: "Canada",
    image: universityShowcase,
    ranking: "#18 Global",
    students: "97,000+",
    rating: 4.6,
    programs: ["Medicine", "Engineering", "Business", "Arts"],
    deadline: "Jan 15, 2025",
    tuition: "CAD 58,160/year",
    type: "Public",
    level: "Both"
  }
];

const Universities = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-8 pb-20">
        {/* Page Header */}
        <section className="bg-gradient-card py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Explore Universities Worldwide
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover and compare top universities across the globe. Find your perfect academic match.
              </p>
              
              {/* Search and Filters */}
              <div className="space-y-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input 
                    placeholder="Search universities by name, location, or program..."
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Program Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="University Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="default">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Results Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {universities.length} Universities Found
                </h2>
                <p className="text-muted-foreground">
                  Showing results for all universities
                </p>
              </div>
              
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ranking">Ranking</SelectItem>
                  <SelectItem value="tuition-low">Tuition (Low to High)</SelectItem>
                  <SelectItem value="tuition-high">Tuition (High to Low)</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="deadline">Application Deadline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <Link to={`/university/${university.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Universities;