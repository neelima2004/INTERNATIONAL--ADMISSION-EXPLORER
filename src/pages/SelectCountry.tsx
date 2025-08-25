import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

interface Country {
  id: string;
  name: string;
  code: string;
  flag_url?: string;
}

const SelectCountry = () => {
  const [user, setUser] = useState<User | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const navigate = useNavigate();

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
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .order('name');

      if (error) throw error;
      setCountries(data || []);
    } catch (error: any) {
      toast.error("Failed to load countries");
    } finally {
      setLoading(false);
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleContinue = () => {
    if (selectedCountry) {
      navigate(`/university-list/${selectedCountry.id}`);
    }
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
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Select Your Destination</h1>
            <p className="text-muted-foreground mt-2">
              Choose a country where you'd like to study abroad
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {countries.map((country) => (
            <Card
              key={country.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedCountry?.id === country.id
                  ? "ring-2 ring-primary bg-primary/5"
                  : ""
              }`}
              onClick={() => handleCountrySelect(country)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {country.flag_url ? (
                      <img
                        src={country.flag_url}
                        alt={`${country.name} flag`}
                        className="w-8 h-6 object-cover rounded"
                      />
                    ) : (
                      "🌍"
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{country.name}</CardTitle>
                    <CardDescription>{country.code}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Explore universities and programs available in {country.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedCountry && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
            <Card className="bg-background/95 backdrop-blur">
              <CardContent className="flex items-center space-x-4 p-4">
                <div className="text-sm">
                  <span className="font-medium">Selected:</span> {selectedCountry.name}
                </div>
                <Button onClick={handleContinue}>
                  View Universities in {selectedCountry.name}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCountry;