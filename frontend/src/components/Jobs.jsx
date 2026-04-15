import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import JobSkeleton from './JobSkeleton';
import { SlidersHorizontal, PackageOpen, Search } from 'lucide-react';
import { Input } from './ui/input';

const Jobs = () => {
    const { allJobs, searchedQuery, loading } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        let filteredJobs = allJobs;
        
        if (searchedQuery) {
            filteredJobs = filteredJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.salary.toString().toLowerCase().includes(searchedQuery.toLowerCase())
            });
        }
        
        if (searchKeyword) {
             filteredJobs = filteredJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    job.company?.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchKeyword.toLowerCase())
            });
        }
        
        setFilterJobs(filteredJobs);
        
    }, [allJobs, searchedQuery, searchKeyword]);

    return (
        <div className='bg-background min-h-screen pb-20 pt-24'>
            <Navbar />
            
            <div className='max-w-7xl mx-auto px-4'>
                <div className='flex flex-col lg:flex-row gap-8 py-8'>
                    {/* Sidebar: Filters */}
                    <div className='w-full lg:w-72 shrink-0'>
                        <div className='sticky top-24 space-y-4'>
                            <div className='flex items-center justify-between px-2'>
                                <h2 className='text-lg font-bold flex items-center gap-2 text-foreground'>
                                    <SlidersHorizontal className='h-4 w-4 text-primary' />
                                    Filters
                                </h2>
                                <span className='text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full'>
                                    {filterJobs.length} Results
                                </span>
                            </div>
                            <FilterCard />
                        </div>
                    </div>

                    {/* Main Content: Job Grid */}
                    <div className='flex-1 lg:pl-6'>
                        <div className='mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4'>
                            <div>
                                <h1 className='text-3xl font-bold mb-2 text-foreground'>
                                    Explore Jobs
                                </h1>
                                <p className='text-muted-foreground'>
                                    Find the perfect role from our active job listings.
                                </p>
                            </div>
                            <div className='relative w-full md:w-72'>
                                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                <Input 
                                    className="pl-10 rounded-xl" 
                                    placeholder="Search by role or company..." 
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                {[1, 2, 3, 4].map((idx) => <JobSkeleton key={idx} />)}
                            </div>
                        ) : filterJobs.length <= 0 ? (
                            <div className='py-20 text-center bg-card rounded-2xl border border-border shadow-sm'>
                                <div className='inline-flex p-6 rounded-full bg-muted border border-border mb-6'>
                                    <PackageOpen className='h-12 w-12 text-muted-foreground' />
                                </div>
                                <h3 className='text-2xl font-bold mb-2'>No Jobs Found</h3>
                                <p className='text-muted-foreground max-w-sm mx-auto'>
                                    We couldn't find any roles matching your search criteria. Try adjusting your filters.
                                </p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <AnimatePresence mode='popLayout'>
                                    {filterJobs.map((job, index) => (
                                        <motion.div
                                            key={job?._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2, delay: index * 0.05 }}
                                            layout
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs