import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Plus, Search } from 'lucide-react'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input]);

    return (
        <div className='min-h-screen bg-background pb-20 pt-24'>
            <Navbar />
            
            <div className='max-w-6xl mx-auto px-4 py-8'>
                {/* Header Section */}
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8'>
                    <div>
                        <h1 className='text-3xl font-bold text-foreground mb-1'>Jobs</h1>
                        <p className='text-muted-foreground'>Monitor and manage active job postings.</p>
                    </div>
                    <Button 
                        onClick={() => navigate("/admin/jobs/create")}
                        className="font-semibold"
                    >
                        <Plus className='mr-2 h-4 w-4' /> Post New Job
                    </Button>
                </div>

                {/* Filter & Table Area */}
                <div className='bg-card border border-border rounded-xl p-6 shadow-sm'>
                    <div className='relative w-full md:w-96 mb-6'>
                        <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground'>
                            <Search className='h-4 w-4' />
                        </div>
                        <Input
                            className="pl-10"
                            placeholder="Filter by role, company..."
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    
                    <AdminJobsTable />
                </div>
            </div>
        </div>
    )
}

export default AdminJobs