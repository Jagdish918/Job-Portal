import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Search, Plus } from 'lucide-react'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className='min-h-screen bg-background pb-20 pt-24'>
            <Navbar />
            
            <div className='max-w-6xl mx-auto px-4 py-8'>
                {/* Header Section */}
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8'>
                    <div>
                        <h1 className='text-3xl font-bold text-foreground mb-1'>Companies</h1>
                        <p className='text-muted-foreground'>Manage and monitor corporate entities.</p>
                    </div>
                    <Button 
                        onClick={() => navigate("/admin/companies/create")}
                        className="font-semibold"
                    >
                        <Plus className='mr-2 h-4 w-4' /> New Company
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
                            placeholder="Search by company name..."
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    
                    <CompaniesTable />
                </div>
            </div>
        </div>
    )
}

export default Companies