import { Globe, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="w-8 h-8" />
              <h3 className="text-2xl font-bold">UniExplore</h3>
            </div>
            <p className="text-primary-foreground/80">
              Your gateway to international education. Discover, compare, and apply to universities worldwide.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#universities" className="hover:text-primary-foreground transition-colors">Universities</a></li>
              <li><a href="#destinations" className="hover:text-primary-foreground transition-colors">Destinations</a></li>
              <li><a href="#programs" className="hover:text-primary-foreground transition-colors">Programs</a></li>
              <li><a href="#scholarships" className="hover:text-primary-foreground transition-colors">Scholarships</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#help" className="hover:text-primary-foreground transition-colors">Help Center</a></li>
              <li><a href="#contact" className="hover:text-primary-foreground transition-colors">Contact Us</a></li>
              <li><a href="#blog" className="hover:text-primary-foreground transition-colors">Blog</a></li>
              <li><a href="#faq" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@uniexplore.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 UniExplore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;