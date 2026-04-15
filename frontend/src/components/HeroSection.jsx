import React, { useState } from 'react'
import { Search, MapPin, Building2, Briefcase, ChevronRight, Zap } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative w-full bg-background pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden'>
            {/* Minimal Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {/* Elegant Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[500px] opacity-30 blur-[100px] bg-gradient-to-tr from-primary/20 via-blue-500/20 to-purple-500/20 rounded-full pointer-events-none"></div>

            <div className='relative z-10 max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center text-center'>
                
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/80 text-xs font-semibold text-muted-foreground mb-8 cursor-default'>
                        <Zap className='h-3.5 w-3.5 text-primary' />
                        <span>The Modern Job Platform</span>
                    </div>
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    className='text-5xl md:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl leading-[1.1] mb-6'
                >
                    Find the work you <br className="hidden sm:block" />
                    <span className='text-primary'>love doing.</span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    className='text-lg md:text-xl text-muted-foreground max-w-2xl font-medium mb-10'
                >
                    Join thousands of companies and talent building the future. Search, apply, and get hired effortlessly.
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                    className='w-full max-w-2xl flex flex-col sm:flex-row items-center gap-3 bg-card p-2 rounded-2xl border border-border shadow-sm'
                >
                    <div className='flex-1 flex items-center px-4 w-full'>
                        <Search className='h-5 w-5 text-muted-foreground mr-3 shrink-0' />
                        <input
                            type="text"
                            placeholder='Job title, company, or keywords...'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                            className='w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/60 h-12 font-medium text-base'
                        />
                    </div>
                    <Button 
                        onClick={searchJobHandler}
                        className='w-full sm:w-auto h-12 px-8 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity'
                    >
                        Search Jobs
                    </Button>
                </motion.div>

                {/* Trusted Companies */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    className='mt-20 pt-10 border-t border-border/40 w-full max-w-4xl'
                >
                    <p className='text-sm text-muted-foreground font-medium mb-6 uppercase tracking-wider text-center'>Trusted by innovative teams worldwide</p>
                    <div className='flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale'>
                        {/* Placeholder brand logos mapping */}
                        {['Google', 'Netflix', 'Airbnb', 'Microsoft', 'Spotify'].map((brand, i) => (
                            <span key={i} className='text-xl md:text-2xl font-black text-foreground'>{brand}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection