import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import JobSkeleton from './JobSkeleton';

const LatestJobs = () => {
    const { allJobs, loading } = useSelector(store => store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-24 px-4'>
            <div className='text-center mb-12'>
                <h2 className='text-3xl md:text-4xl font-extrabold tracking-tight mb-4'>Latest Opportunities</h2>
                <p className='text-muted-foreground text-lg'>Discover the most recent roles added to our platform.</p>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    loading ? (
                        [1, 2, 3, 4, 5, 6].map((idx) => <JobSkeleton key={idx} />)
                    ) : allJobs.length <= 0 ? (
                        <div className="col-span-full text-center py-20 text-muted-foreground">No roles available right now.</div>
                    ) : (
                        allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs