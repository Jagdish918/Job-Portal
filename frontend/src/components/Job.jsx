import React from 'react'
import { Button } from './ui/button'
import { Bookmark, BookmarkCheck, MapPin, Building2, Clock, Share2 } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToSavedJobs, removeFromSavedJobs } from '@/redux/jobSlice'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { savedJobs = [] } = useSelector(store => store.job);
    
    const isSaved = savedJobs?.some(sj => sj?._id === job?._id);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    const toggleSavedStatus = (e) => {
        e.stopPropagation();
        if (isSaved) {
            dispatch(removeFromSavedJobs(job?._id));
            toast.success("Removed from bookmarks");
        } else {
            dispatch(addToSavedJobs(job));
            toast.success("Added to bookmarks");
        }
    }

    return (
        <div 
            onClick={() => navigate(`/description/${job?._id}`)}
            className='bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col h-full'
        >
            <div className='flex items-center justify-between mb-4'>
                <p className='text-xs font-semibold text-muted-foreground flex items-center gap-1'>
                    <Clock className='h-3 w-3' />
                    {daysAgoFunction(job?.createdAt) === 0 ? "Published Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <div className='flex items-center gap-2'>
                    <button 
                        onClick={(e) => { e.stopPropagation(); toast.info("Link copied") }}
                        className='p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors'
                        title='Share'
                    >
                        <Share2 className='h-4 w-4' />
                    </button>
                    <button 
                        onClick={toggleSavedStatus}
                        className={`p-2 rounded-full transition-colors ${isSaved ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-muted'}`}
                        title={isSaved ? "Saved" : "Save for later"}
                    >
                        {isSaved ? <BookmarkCheck className='h-5 w-5 fill-current' /> : <Bookmark className='h-5 w-5' />}
                    </button>
                </div>
            </div>

            <div className='flex items-center gap-4 mb-5'>
                <div className='h-14 w-14 rounded-xl border border-border bg-background flex items-center justify-center shrink-0'>
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                    </Avatar>
                </div>
                <div>
                    <h1 className='text-xl font-bold text-foreground line-clamp-1 mb-1'>{job?.company?.name}</h1>
                    <div className='flex items-center gap-1.5 text-xs font-medium text-muted-foreground'>
                        <MapPin className='h-3.5 w-3.5' />
                        {job?.location || 'India'}
                    </div>
                </div>
            </div>

            <div className='mb-6 flex-grow'>
                <h2 className='text-lg font-bold text-foreground mb-2 line-clamp-2'>{job?.title}</h2>
                <p className='text-sm text-muted-foreground leading-relaxed line-clamp-3'>
                    {job?.description}
                </p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mb-6'>
                <Badge variant="secondary" className='text-primary bg-primary/10 font-bold'>
                    {job?.position} Positions
                </Badge>
                <Badge variant="secondary" className='text-[#F83002] bg-[#F83002]/10 font-bold'>
                    {job?.jobType}
                </Badge>
                <Badge variant="secondary" className='text-[#7209b7] bg-[#7209b7]/10 font-bold'>
                    {job?.salary} LPA
                </Badge>
            </div>

            <div className='flex items-center gap-4 mt-auto'>
                <Button variant="outline" className="w-full">Details</Button>
                <Button className="w-full">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job