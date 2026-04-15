import React from 'react'
import { Skeleton } from './ui/skeleton'

const JobSkeleton = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-background border border-border'>
            <div className='flex items-center justify-between'>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className='space-y-2'>
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>

            <div className='space-y-3 mt-4'>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
            </div>
        </div>
    )
}

export default JobSkeleton
