import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import AppliedJobTable from './AppliedJobTable'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, CheckCircle2, Clock, XCircle, Bookmark, Zap, TrendingUp, Filter } from 'lucide-react'
import Job from './Job'
import { Button } from './ui/button'

const StatCard = ({ title, count, icon: Icon, color, delay }) => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.4 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className={`p-6 rounded-2xl shadow-sm bg-card border border-border flex flex-col justify-between group cursor-pointer hover:shadow-xl transition-all h-full`}
    >
        <div className='flex items-center justify-between mb-4'>
            <div className={`p-4 rounded-xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
                <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            <TrendingUp className='h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity' />
        </div>
        <div>
            <p className='text-xs font-black uppercase tracking-widest text-muted-foreground mb-1'>{title}</p>
            <h2 className='text-4xl font-black text-foreground tabular-nums'>{count}</h2>
        </div>
    </motion.div>
)

const Dashboard = () => {
    const [activeTab, setActiveTab ] = useState('applied');
    const { allAppliedJobs = [], savedJobs = [] } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    
    const stats = [
        { title: 'Total Applications', count: allAppliedJobs?.length || 0, icon: Briefcase, color: "bg-blue-500", delay: 0.1 },
        { title: 'Saved for Later', count: savedJobs?.length || 0, icon: Bookmark, color: "bg-purple-500", delay: 0.2 },
        { title: 'Pending Review', count: (allAppliedJobs || []).filter(job => job.status === 'pending').length, icon: Clock, color: "bg-yellow-500", delay: 0.3 },
        { title: 'Accepted Offers', count: (allAppliedJobs || []).filter(job => job.status === 'accepted').length, icon: CheckCircle2, color: "bg-green-500", delay: 0.4 }
    ]

    return (
        <div className='min-h-screen bg-background pb-20 pt-32'>
            <Navbar />
            
            {/* Header Section */}
            <div className='bg-muted/30 border-b border-border/50 py-12 mb-10'>
                <div className='max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-6'>
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className='text-4xl font-black leading-tight mb-2'>
                            Welcome back, <span className='text-gradient'>{user?.fullname?.split(' ')[0]}</span>! 👋
                        </h1>
                        <p className='text-muted-foreground font-medium'>
                            Your job search performance is looking <span className='text-green-500 font-bold underline decoration-2'>excellent</span> today.
                        </p>
                    </motion.div>
                    <div className='flex gap-3'>
                        <Button variant="outline" className="rounded-full px-6 font-bold hover:bg-background/80"><Filter className='mr-2 h-4 w-4' /> Filter Data</Button>
                        <Button className="rounded-full px-8 font-bold shadow-lg shadow-primary/20"><Zap className='mr-2 h-4 w-4' /> Quick Apply</Button>
                    </div>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4'>
                {/* Stats Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
                    {stats.map((s, i) => <StatCard key={i} {...s} />)}
                </div>

                {/* Main Content Area */}
                <div className='flex flex-col lg:flex-row gap-10'>
                    <div className='flex-1'>
                        {/* Custom Tab Switcher */}
                        <div className='flex gap-1 p-1 bg-muted rounded-xl w-fit mb-8'>
                            {['applied', 'saved'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative px-8 py-2 rounded-lg text-sm font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    {activeTab === tab && (
                                        <motion.div 
                                            layoutId="activeTabDashboard"
                                            className='absolute inset-0 bg-primary rounded-lg z-0'
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className='relative z-10'>{tab} {tab === 'applied' ? `(${(allAppliedJobs || []).length})` : `(${(savedJobs || []).length})`}</span>
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode='wait'>
                            {activeTab === 'applied' ? (
                                <motion.div 
                                    key="applied_view"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className='bg-card rounded-2xl shadow-sm border border-border p-8'
                                >
                                    <h2 className='text-2xl font-black mb-8 flex items-center gap-3'>
                                        <Briefcase className='text-primary h-6 w-6' />
                                        Application Pipeline
                                    </h2>
                                    <AppliedJobTable />
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="saved_view"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                        {savedJobs.length > 0 ? (
                                            savedJobs.map((job) => <Job key={job._id} job={job} />)
                                        ) : (
                                            <div className='col-span-full py-32 text-center bg-card rounded-2xl border border-dashed border-border group'>
                                                <div className='inline-flex p-6 rounded-full bg-muted/50 mb-6 group-hover:bg-primary/10 transition-colors'>
                                                    <Bookmark className='h-12 w-12 text-muted-foreground opacity-20' />
                                                </div>
                                                <h3 className='text-2xl font-black mb-2'>Empty Library</h3>
                                                <p className='text-muted-foreground font-medium max-w-xs mx-auto italic'>Start exploring opportunities and save them here for later review.</p>
                                                <Button 
                                                    onClick={() => navigate('/jobs')}
                                                    variant="link" 
                                                    className="mt-4 font-bold text-primary underline decoration-2 underline-offset-4"
                                                >
                                                    Browse Jobs Now
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Sidebar - Activity or Insights */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className='lg:w-80 space-y-6'
                    >
                        <div className='bg-card border border-border rounded-2xl p-6'>
                            <h3 className='font-black uppercase tracking-tighter text-lg mb-6 flex items-center gap-2 italic'>
                                <TrendingUp className='h-5 w-5 text-primary' /> Weekly Insights
                            </h3>
                            <div className='space-y-4'>
                                <div className='p-4 rounded-xl bg-muted/30 border border-border/50'>
                                    <p className='text-xs font-bold text-muted-foreground uppercase mb-1'>Profile Views</p>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-2xl font-black'>148</span>
                                        <span className='text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500'>+12%</span>
                                    </div>
                                </div>
                                <div className='p-4 rounded-xl bg-muted/30 border border-border/50'>
                                    <p className='text-xs font-bold text-muted-foreground uppercase mb-1'>Job Matches</p>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-2xl font-black'>24</span>
                                        <span className='text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500'>New</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" className="w-full mt-6 font-bold text-muted-foreground group">
                                View History <TrendingUp className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
