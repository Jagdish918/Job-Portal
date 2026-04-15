import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Github, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter italic">Job<span className='text-gradient'>Portal</span></h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              We empower the next generation of talent to find their dream roles in world-class companies. Built for efficiency, designed for impact.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 uppercase tracking-widest text-foreground">Explore</h3>
            <ul className="space-y-4 font-medium text-muted-foreground">
              <li><Link to="/jobs" className="hover:text-primary transition-colors">Browse Jobs</Link></li>
              <li><Link to="/browse" className="hover:text-primary transition-colors">Categories</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Candidate Dashboard</Link></li>
              <li><Link to="/admin/jobs" className="hover:text-primary transition-colors">Post a Job</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 uppercase tracking-widest text-foreground">Company</h3>
            <ul className="space-y-4 font-medium text-muted-foreground">
              <li><Link to="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Our Team</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 uppercase tracking-widest text-foreground">Contact</h3>
            <ul className="space-y-4 font-medium text-muted-foreground">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>123 Innovation Drive, Tech City</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+1 (555) 000-1111</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>support@jobportal.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-bold text-muted-foreground italic">
            © 2024 JobPortal. Designed with ❤️ for a better future.
          </p>
          <div className="flex gap-8 text-sm font-bold text-muted-foreground">
            <Link to="#" className="hover:text-primary">Sitemap</Link>
            <Link to="#" className="hover:text-primary">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;