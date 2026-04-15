import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX, LayoutGrid } from 'lucide-react';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);

    return (
        <div className='min-h-screen bg-background pb-20 pt-32'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 mt-8'>
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex items-center justify-between border-b border-border/50 pb-8 mb-12'
                >
                    <div>
                        <h1 className='text-4xl md:text-5xl font-black italic tracking-tighter'>
                            BROWSE <span className='text-gradient'>JOBS</span>
                        </h1>
                        <p className='text-muted-foreground font-medium italic mt-2'>Found {allJobs.length} available opportunities for you.</p>
                    </div>
                    <div className='hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border border-border text-muted-foreground font-bold italic text-xs'>
                        <LayoutGrid className='h-3 w-3' /> Grid View
                    </div>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    <AnimatePresence mode='popLayout'>
                        {allJobs.length > 0 ? (
                            allJobs.map((job, index) => (
                                <motion.div
                                    key={job._id}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <Job job={job} />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className='col-span-full py-32 text-center'
                            >
                                <div className='flex flex-col items-center gap-6'>
                                    <div className='h-24 w-24 rounded-[2rem] bg-muted flex items-center justify-center text-muted-foreground/30'>
                                        <SearchX className='h-12 w-12' />
                                    </div>
                                    <div className='space-y-2'>
                                        <h2 className='text-2xl font-black italic tracking-tight'>No matches identified.</h2>
                                        <p className='text-muted-foreground font-medium italic'>Try expanding your refinement criteria or clearing your search.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default Browse