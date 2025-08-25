import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface University {
  id: string;
  name: string;
  location: string;
  ranking: number;
  description: string;
  programs: string[];
  tuition_fee: number;
  image_url: string;
}

interface Country {
  id: string;
  name: string;
  code: string;
}

interface EnrollmentData {
  university_name: string;
  student_count: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const UniversityList = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [universities, setUniversities] = useState<University[]>([]);
  const [country, setCountry] = useState<Country | null>(null);
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate('/auth');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (countryId) {
      loadData();
    }
  }, [countryId]);

  const loadData = async () => {
    try {
      // Load country info
      const { data: countryData, error: countryError } = await supabase
        .from('countries')
        .select('*')
        .eq('id', countryId)
        .single();

      if (countryError) throw countryError;
      setCountry(countryData);

      // Load universities
      const { data: universitiesData, error: universitiesError } = await supabase
        .from('universities')
        .select('*')
        .eq('country_id', countryId)
        .order('ranking');

      if (universitiesError) throw universitiesError;
      setUniversities(universitiesData || []);

      // Load enrollment statistics (mock data for visualization)
      const mockEnrollmentData = universitiesData?.slice(0, 5).map((uni, index) => ({
        university_name: uni.name.split(' ')[0], // Shortened name for chart
        student_count: Math.floor(Math.random() * 5000) + 1000
      })) || [];
      
      setEnrollmentData(mockEnrollmentData);
    } catch (error: any) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleUniversitySelect = (universityId: string) => {
    navigate(`/university-details/${universityId}`);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut({ scope: 'global' });
      window.location.href = '/auth';
    } catch (error: any) {
      toast.error("Failed to sign out");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/select-country')}
              className="mb-2"
            >
              ← Back to Country Selection
            </Button>
            <h1 className="text-3xl font-bold">
              Universities in {country?.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              Discover top universities and enrollment statistics
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        {/* Statistics Section */}
        {enrollmentData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Student Enrollment by University</CardTitle>
                <CardDescription>
                  Popular universities based on student enrollment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="university_name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="student_count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>University Distribution</CardTitle>
                <CardDescription>
                  Student distribution across universities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={enrollmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ university_name, percent }) => 
                        `${university_name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="student_count"
                    >
                      {enrollmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((university) => (
            <Card
              key={university.id}
              className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
              onClick={() => handleUniversitySelect(university.id)}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg flex items-center justify-center">
                <div className="text-4xl">🏛️</div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-2">
                    {university.name}
                  </CardTitle>
                  <Badge variant="secondary">#{university.ranking}</Badge>
                </div>
                <CardDescription>{university.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {university.description}
                </p>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {university.programs?.slice(0, 3).map((program, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {program}
                      </Badge>
                    ))}
                    {university.programs?.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{university.programs.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm font-medium">
                    Tuition: ${university.tuition_fee?.toLocaleString()}/year
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {universities.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-4xl mb-4">🏛️</div>
              <CardTitle className="mb-2">No Universities Found</CardTitle>
              <CardDescription>
                No universities are currently available for {country?.name}.
                Please check back later or try another country.
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UniversityList;