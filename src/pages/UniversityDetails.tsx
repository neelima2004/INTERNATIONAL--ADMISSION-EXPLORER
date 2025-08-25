import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, Users, Star, Calendar, Globe, GraduationCap, 
  DollarSign, Clock, Award, BookOpen, Building, Phone,
  Mail, Heart, Share2, ExternalLink, Loader2
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import universityShowcase from "@/assets/university-showcase.jpg";

interface University {
  id: string;
  name: string;
  location: string;
  ranking: number;
  description: string;
  programs: string[];
  tuition_fee: number;
  image_url: string | null;
  website_url: string;
  admission_requirements: string | null;
  country_id: string;
  created_at: string;
  updated_at: string;
}

interface Country {
  id: string;
  name: string;
  code: string;
  flag_url: string;
}

const UniversityDetails = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState<University | null>(null);
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadUniversityData(id);
    }
  }, [id]);

  const loadUniversityData = async (universityId: string) => {
    try {
      setLoading(true);
      
      const { data: universityData, error: universityError } = await supabase
        .from('universities')
        .select('*')
        .eq('id', universityId)
        .single();

      if (universityError) {
        console.error('Error loading university:', universityError);
        toast.error('Failed to load university details');
        return;
      }

      if (universityData) {
        setUniversity(universityData);
        
        // Load country data
        const { data: countryData, error: countryError } = await supabase
          .from('countries')
          .select('*')
          .eq('id', universityData.country_id)
          .single();

        if (countryError) {
          console.error('Error loading country:', countryError);
        } else {
          setCountry(countryData);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load university details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading university details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">University Not Found</h1>
          <p className="text-muted-foreground mb-8">The university you're looking for doesn't exist.</p>
          <Link to="/universities">
            <Button>Back to Universities</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-8 pb-20">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          <img 
            src={university.image_url || universityShowcase}
            alt={university.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero/70"></div>
          
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <div className="flex items-end justify-between">
                <div className="text-primary-foreground">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary" className="bg-background/90 text-primary font-semibold text-lg px-4 py-2">
                      #{university.ranking} Ranking
                    </Badge>
                    <div className="flex items-center gap-2 bg-background/90 rounded-full px-4 py-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-medium text-foreground">4.5</span>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    {university.name}
                  </h1>
                  
                  <div className="flex items-center gap-2 text-xl">
                    <MapPin className="w-5 h-5" />
                    <span>{university.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button variant="secondary" size="lg">
                    <Heart className="w-5 h-5 mr-2" />
                    Save
                  </Button>
                  <Button variant="secondary" size="lg">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                  <Button size="lg">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="programs">Programs</TabsTrigger>
                    <TabsTrigger value="admissions">Admissions</TabsTrigger>
                    <TabsTrigger value="campus">Campus</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-4">About {university.name}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {university.description || 'Detailed description will be updated soon.'}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="p-6">
                          <h4 className="text-lg font-semibold mb-4">Quick Facts</h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Building className="w-5 h-5 text-primary" />
                              <span>Country: {country?.name || 'Loading...'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-primary" />
                              <span>Location: {university.location}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Award className="w-5 h-5 text-primary" />
                              <span>Ranking: #{university.ranking}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <DollarSign className="w-5 h-5 text-primary" />
                              <span>Tuition: ${university.tuition_fee?.toLocaleString()}/year</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
                          <div className="space-y-3">
                            {university.website_url && (
                              <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-primary" />
                                <a href={university.website_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  {university.website_url.replace('https://', '').replace('http://', '')}
                                </a>
                              </div>
                            )}
                            <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-primary" />
                              <span>{university.location}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-primary" />
                              <span>Updated: {new Date(university.updated_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="programs" className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-6">Academic Programs</h3>
                        <div className="space-y-4">
                          {university.programs && university.programs.length > 0 ? (
                            university.programs.map((program, index) => (
                              <div key={index} className="border border-border rounded-lg p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="text-lg font-semibold">{program}</h4>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                      <Badge variant="outline">Available</Badge>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-bold text-primary">${university.tuition_fee?.toLocaleString()}</div>
                                    <div className="text-sm text-muted-foreground">per year</div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-muted-foreground">Program information will be updated soon.</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="admissions" className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-6">Admission Requirements</h3>
                        
                        <div className="space-y-6">
                          {university.admission_requirements ? (
                            <div>
                              <h4 className="text-lg font-semibold mb-3">Requirements</h4>
                              <p className="text-muted-foreground leading-relaxed">
                                {university.admission_requirements}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <h4 className="text-lg font-semibold mb-3">General Requirements</h4>
                              <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span>High school diploma or equivalent for undergraduate programs</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span>Bachelor's degree for graduate programs</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span>English proficiency test (TOEFL/IELTS) for international students</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span>Letters of recommendation</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span>Personal statement or essay</span>
                                </li>
                              </ul>
                            </div>
                          )}
                          
                          <div className="bg-education-light rounded-lg p-4">
                            <h4 className="text-lg font-semibold mb-3">Contact for Detailed Requirements</h4>
                            <p className="text-sm text-muted-foreground">
                              For specific admission requirements and deadlines, please visit the university's official website or contact their admissions office directly.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="campus" className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-6">Campus & Facilities</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 p-3 bg-education-light rounded-lg">
                            <BookOpen className="w-5 h-5 text-primary" />
                            <span>Library & Study Areas</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-education-light rounded-lg">
                            <Building className="w-5 h-5 text-primary" />
                            <span>Modern Classrooms</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-education-light rounded-lg">
                            <Users className="w-5 h-5 text-primary" />
                            <span>Student Recreation Center</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-education-light rounded-lg">
                            <GraduationCap className="w-5 h-5 text-primary" />
                            <span>Research Facilities</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-education-light rounded-lg">
                            <Building className="w-5 h-5 text-primary" />
                            <span>Campus Housing</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-education-light rounded-lg">
                            <Heart className="w-5 h-5 text-primary" />
                            <span>Health & Wellness Center</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Tuition & Fees</h3>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        ${university.tuition_fee?.toLocaleString() || 'TBD'}
                      </div>
                      <div className="text-muted-foreground mb-4">Annual tuition</div>
                      {university.website_url && (
                        <Button className="w-full mb-3" asChild>
                          <a href={university.website_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit Website
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" className="w-full">
                        Request Information
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Similar Universities</h3>
                    <div className="space-y-3">
                      <Link to="/university/2" className="block p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                        <div className="font-semibold">University of Oxford</div>
                        <div className="text-sm text-muted-foreground">Oxford, UK</div>
                      </Link>
                      <Link to="/university/3" className="block p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                        <div className="font-semibold">MIT</div>
                        <div className="text-sm text-muted-foreground">Cambridge, USA</div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default UniversityDetails;