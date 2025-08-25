import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedUniversities from "@/components/FeaturedUniversities";
import PopularDestinations from "@/components/PopularDestinations";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed their profile, if not redirect to student details
    const checkProfileCompletion = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (!profile || !profile.first_name || !profile.last_name) {
          navigate('/student-details');
        }
      }
    };

    checkProfileCompletion();
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedUniversities />
      <PopularDestinations />
      <Footer />
    </div>
  );
};

export default Index;
