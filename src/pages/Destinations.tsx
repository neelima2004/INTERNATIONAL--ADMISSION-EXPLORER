import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopularDestinations from "@/components/PopularDestinations";

const Destinations = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-8">
        {/* Page Header */}
        <section className="bg-gradient-card py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Study Destinations Worldwide
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore the world's top study destinations and find the perfect country for your international education journey. 
              Each destination offers unique opportunities, cultures, and academic experiences.
            </p>
          </div>
        </section>
        
        <PopularDestinations />
      </main>
      
      <Footer />
    </div>
  );
};

export default Destinations;