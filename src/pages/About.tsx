import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Users, Award, Target, Heart, Lightbulb } from "lucide-react";
import heroStudents from "@/assets/hero-students.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-8 pb-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroStudents})` }}
          >
            <div className="absolute inset-0 bg-gradient-hero/80"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              About UniExplore
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              We're dedicated to making international education accessible to students worldwide. 
              Our platform connects ambitious learners with top universities across the globe.
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Our Mission
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                To democratize access to world-class education by providing students with comprehensive 
                information, tools, and guidance needed to make informed decisions about their academic future. 
                We believe that every student deserves the opportunity to pursue their dreams, regardless of 
                geographical boundaries.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center shadow-card">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Global Access</h3>
                  <p className="text-muted-foreground">
                    Connect with universities from over 50 countries and explore diverse academic opportunities worldwide.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-card">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Smart Guidance</h3>
                  <p className="text-muted-foreground">
                    Get personalized recommendations and insights to help you choose the perfect university and program.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-card">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Student First</h3>
                  <p className="text-muted-foreground">
                    Every feature we build is designed with student success and experience as our top priority.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 bg-gradient-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                Our Values
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Excellence</h3>
                    <p className="text-muted-foreground">
                      We strive for excellence in everything we do, from the quality of our platform 
                      to the accuracy of our university data and the helpfulness of our guidance.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Inclusivity</h3>
                    <p className="text-muted-foreground">
                      We believe education should be accessible to everyone, regardless of background, 
                      nationality, or financial circumstances. Our platform welcomes all students.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Innovation</h3>
                    <p className="text-muted-foreground">
                      We continuously innovate to improve the student experience, leveraging technology 
                      to make university discovery and application processes simpler and more effective.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Impact
              </h2>
              <p className="text-xl text-muted-foreground">
                Helping students achieve their dreams worldwide
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
                <div className="text-muted-foreground">Universities</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100K+</div>
                <div className="text-muted-foreground">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Programs</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have found their perfect university through UniExplore. 
              Your dream education is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Explore Universities
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;