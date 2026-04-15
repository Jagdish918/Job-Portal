import React from 'react'
import Navbar from '../shared/Navbar'
import { useSelector } from 'react-redux'
import { Building2, Users, Briefcase, Plus, TrendingUp, ChevronRight, LayoutDashboard, PackageOpen } from 'lucide-react'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const StatCard = ({ title, count, icon: Icon, color }) => (
    <div className='p-6 rounded-2xl shadow-sm bg-card border border-border flex flex-col justify-between hover:shadow-md transition-all h-full'>
        <div className='flex items-center justify-between mb-4'>
            <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
            </div>
        </div>
        <div>
            <p className='text-sm font-semibold text-muted-foreground mb-1'>{title}</p>
            <h2 className='text-3xl font-bold text-foreground'>{count}</h2>
        </div>
    </div>
)

const AdminDashboard = () => {
    useGetAllAdminJobs();
    useGetAllCompanies();
    const navigate = useNavigate();
    const { allAdminJobs } = useSelector(store => store.job);
    const { companies } = useSelector(store => store.company);

    const totalApplicants = allAdminJobs.reduce((acc, job) => acc + (job.applications?.length || 0), 0);
    const topJobs = [...allAdminJobs].sort((a,b) => (b.applications?.length || 0) - (a.applications?.length || 0)).slice(0, 5);

    const stats = [
        { title: 'Registered Companies', count: companies.length, icon: Building2, color: "bg-blue-500" },
        { title: 'Active Job Listings', count: allAdminJobs.length, icon: Briefcase, color: "bg-purple-500" },
        { title: 'Total Applications', count: totalApplicants, icon: Users, color: "bg-green-500" }
    ]

    return (
        <div className='min-h-screen bg-background pb-20 pt-24'>
            <Navbar />
            
            {/* Header Section */}
            <div className='max-w-6xl mx-auto px-4 py-8 mb-4 border-b border-border/50'>
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
                    <div>
                        <div className='flex items-center gap-2 text-primary font-semibold text-sm mb-2'>
                            <LayoutDashboard className='h-4 w-4' /> Admin Panel
                        </div>
                        <h1 className='text-3xl md:text-4xl font-bold mb-2'>
                            Dashboard
                        </h1>
                        <p className='text-muted-foreground'>
                            Manage your ecosystem and monitor analytics.
                        </p>
                    </div>
                    <div className='flex flex-wrap gap-3'>
                        <Button 
                            onClick={() => navigate("/admin/companies/create")} 
                            variant="outline" 
                        >
                            <Building2 className='mr-2 h-4 w-4' /> New Company
                        </Button>
                        <Button 
                            onClick={() => navigate("/admin/jobs/create")} 
                        >
                            <Plus className='mr-2 h-4 w-4' /> Post New Role
                        </Button>
                    </div>
                </div>
            </div>

            <div className='max-w-6xl mx-auto px-4'>
                {/* Stats Grid */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
                    {stats.map((s, i) => <StatCard key={i} {...s} />)}
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Top Jobs List */}
                    <div className='lg:col-span-2'>
                        <div className='flex items-center justify-between mb-6'>
                            <h2 className='text-xl font-bold flex items-center gap-2'>
                                <TrendingUp className='text-primary h-5 w-5' /> High Impact Roles
                            </h2>
                            <Button variant="link" onClick={() => navigate('/admin/jobs')} className="text-primary px-0">View All</Button>
                        </div>
                        
                        <div className='space-y-4'>
                            {topJobs.length > 0 ? topJobs.map((job, i) => (
                                <div 
                                    key={job._id}
                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                    className='flex items-center justify-between p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer'
                                >
                                    <div className='flex items-center gap-4'>
                                        <div className='h-10 w-10 rounded-lg bg-muted flex items-center justify-center font-bold text-lg text-primary'>
                                            {job.title[0]}
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-base text-foreground'>{job.title}</h3>
                                            <p className='text-sm text-muted-foreground'>{job.company?.name} • {job.location}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <div className='text-right'>
                                            <p className='text-xl font-bold text-foreground'>{job.applications?.length || 0}</p>
                                            <p className='text-[10px] uppercase font-semibold text-muted-foreground'>Applicants</p>
                                        </div>
                                        <ChevronRight className='h-5 w-5 text-muted-foreground' />
                                    </div>
                                </div>
                            )) : (
                                <div className='py-12 text-center bg-card rounded-xl border border-dashed border-border'>
                                    <PackageOpen className='h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50' />
                                    <p className='text-muted-foreground font-medium'>No active job postings found.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Access Side Panel */}
                    <div className='space-y-6'>
                        <div className='bg-card border border-border rounded-xl p-6 shadow-sm'>
                            <h3 className='font-bold text-base mb-6'>Quick Actions</h3>
                            <div className='space-y-3'>
                                <Button 
                                    onClick={() => navigate("/admin/companies")} 
                                    variant="outline" 
                                    className='w-full justify-start'
                                >
                                    <Building2 className='h-4 w-4 mr-2' /> Manage Companies
                                </Button>
                                <Button 
                                    onClick={() => navigate("/admin/jobs")} 
                                    variant="outline" 
                                    className='w-full justify-start'
                                >
                                    <Briefcase className='h-4 w-4 mr-2' /> View Job Postings
                                </Button>
                                <Button 
                                    onClick={() => navigate("/admin/jobs/create")} 
                                    variant="default" 
                                    className='w-full justify-start'
                                >
                                    <Plus className='h-4 w-4 mr-2' /> Post New Role
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
