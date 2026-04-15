import React from 'react'
import { MapPin, Building2, ChevronRight } from 'lucide-react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    
    return (
        <div 
            onClick={() => navigate(`/description/${job?._id}`)} 
            className='bg-card p-6 rounded-2xl border border-border shadow-sm cursor-pointer hover:shadow-md transition-all flex flex-col h-full'
        >
            <div className='flex items-center gap-4 mb-4'>
                <div className='h-12 w-12 rounded-lg border border-border bg-background flex items-center justify-center shrink-0'>
                    <Building2 className='h-6 w-6 text-muted-foreground' />
                </div>
                <div className='flex-1 pr-2'>
                    <h1 className='font-bold text-lg text-foreground line-clamp-1'>
                        {job?.company?.name}
                    </h1>
                    <div className='flex items-center gap-1 text-sm text-muted-foreground mt-0.5'>
                        <MapPin className='h-3.5 w-3.5' />
                        {job?.location || 'India'}
                    </div>
                </div>
            </div>

            <div className='mb-5 flex-grow'>
                <h2 className='text-lg font-bold text-foreground mb-2 line-clamp-2'>
                    {job?.title}
                </h2>
                <p className='text-sm text-muted-foreground line-clamp-3'>
                    {job?.description}
                </p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-auto'>
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
        </div>
    )
}

export default LatestJobCards