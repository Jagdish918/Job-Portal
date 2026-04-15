import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Zap, Globe, Sparkles } from 'lucide-react'

const FeatureSection = () => (
  <div className='py-24 bg-background border-t border-border/50'>
    <div className='max-w-7xl mx-auto px-4'>
      <div className='text-center mb-16'>
        <h2 className='text-3xl md:text-4xl font-extrabold tracking-tight mb-4'>Built for modern teams and talent</h2>
        <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>Everything you need to manage your career or find the perfect candidate, all in one platform.</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {[
          { title: 'Lightning Fast', desc: 'Real-time updates and seamless interactions across the board.', icon: Zap },
          { title: 'Secure Data', desc: 'Enterprise-grade security protecting your personal information.', icon: Shield },
          { title: 'Global Reach', desc: 'Connect with innovative companies from around the world.', icon: Globe },
          { title: 'Quality Matches', desc: 'Advanced algorithms to find the perfect role for your skills.', icon: Sparkles }
        ].map((f, i) => (
          <div 
            key={i} 
            className='p-6 rounded-2xl bg-card border border-border shadow-sm'
          >
            <div className='h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6'>
                <f.icon className='h-6 w-6 text-primary' />
            </div>
            <h3 className='font-bold text-lg mb-2'>{f.title}</h3>
            <p className='text-muted-foreground text-sm leading-relaxed'>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const CTASection = () => {
    const navigate = useNavigate();
    return (
        <div className='py-24 bg-primary text-primary-foreground'>
            <div className='max-w-4xl mx-auto px-4 text-center'>
                <h2 className='text-4xl md:text-5xl font-extrabold tracking-tight mb-6'>Ready to accelerate your career?</h2>
                <p className='text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto'>
                    Join our network of elite professionals and innovative companies building the future together.
                </p>
                <div className='flex flex-col sm:flex-row justify-center gap-4'>
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/signup')}
                        className='px-8 py-4 bg-background text-foreground rounded-xl font-bold text-sm shadow-xl'
                    >
                        Create an account
                    </motion.button>
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/jobs')}
                        className='px-8 py-4 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 rounded-xl font-bold text-sm hover:bg-primary-foreground/20'
                    >
                        Browse all jobs
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  
  return (
    <div className='bg-background min-h-screen selection:bg-primary selection:text-primary-foreground'>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <FeatureSection />
        <CTASection />
      </motion.div>
      <Footer />
    </div>
  )
}

export default Home