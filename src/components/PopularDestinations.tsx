import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, GraduationCap, Globe, TrendingUp } from "lucide-react";
import worldDestinations from "@/assets/world-destinations.jpg";

const destinations = [
  {
    id: 1,
    country: "United States",
    flag: "🇺🇸",
    universities: "4,000+",
    students: "1.2M international",
    popularCities: ["New York", "Boston", "Los Angeles", "Chicago"],
    avgTuition: "$35,000 - $60,000",
    visaType: "F-1 Student Visa",
    trending: true
  },
  {
    id: 2,
    country: "United Kingdom",
    flag: "🇬🇧",
    universities: "400+",
    students: "500K international",
    popularCities: ["London", "Oxford", "Cambridge", "Edinburgh"],
    avgTuition: "£15,000 - £35,000",
    visaType: "Student Visa (Tier 4)",
    trending: true
  },
  {
    id: 3,
    country: "Canada",
    flag: "🇨🇦",
    universities: "200+",
    students: "400K international",
    popularCities: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    avgTuition: "CAD 20,000 - 40,000",
    visaType: "Study Permit",
    trending: false
  },
  {
    id: 4,
    country: "Australia",
    flag: "🇦🇺",
    universities: "150+",
    students: "350K international",
    popularCities: ["Sydney", "Melbourne", "Brisbane", "Perth"],
    avgTuition: "AUD 25,000 - 45,000",
    visaType: "Student Visa (500)",
    trending: false
  },
  {
    id: 5,
    country: "Germany",
    flag: "🇩🇪",
    universities: "300+",
    students: "300K international",
    popularCities: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
    avgTuition: "€0 - €20,000",
    visaType: "Student Visa",
    trending: true
  },
  {
    id: 6,
    country: "Netherlands",
    flag: "🇳🇱",
    universities: "100+",
    students: "120K international",
    popularCities: ["Amsterdam", "Utrecht", "The Hague", "Rotterdam"],
    avgTuition: "€8,000 - €18,000",
    visaType: "Student Visa",
    trending: false
  }
];

const PopularDestinations = () => {
  return (
    <section id="destinations" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Popular Study Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore top countries for international education and find your perfect study destination
          </p>
        </div>
        
        {/* World Map Visual */}
        <div className="mb-12 relative">
          <img 
            src={worldDestinations}
            alt="World Study Destinations"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-card"
          />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.id} className="group shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{destination.flag}</span>
                    <h3 className="text-xl font-bold text-foreground">
                      {destination.country}
                    </h3>
                  </div>
                  {destination.trending && (
                    <Badge variant="secondary" className="bg-education-light text-education-blue">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{destination.universities} universities</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{destination.students}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      {destination.popularCities.slice(0, 2).join(", ")}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Tuition:</span>
                    <span className="text-muted-foreground ml-2">{destination.avgTuition}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Visa:</span>
                    <span className="text-muted-foreground ml-2">{destination.visaType}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Explore {destination.country}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="default" size="lg">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;