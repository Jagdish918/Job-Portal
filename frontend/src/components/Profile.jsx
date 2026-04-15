import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, Briefcase, BadgeCheck, FileText, ExternalLink } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className='bg-background min-h-screen pb-20 pt-24'>
            <Navbar />
            
            <div className='max-w-7xl mx-auto px-4 pt-12'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Left Column: User Info Card */}
                    <div className='lg:col-span-1 border border-border bg-card rounded-2xl p-6 shadow-sm h-fit sticky top-24'>
                        <div className='flex flex-col items-center text-center'>
                            <div className='relative'>
                                <Avatar className="h-32 w-32 border-2 border-primary/20 bg-muted">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" className="object-cover" />
                                </Avatar>
                                <Button 
                                    onClick={() => setOpen(true)} 
                                    variant="outline" 
                                    size="icon" 
                                    className="absolute bottom-0 right-0 rounded-full shadow-sm bg-background border border-border hover:bg-muted"
                                >
                                    <Pen className='h-4 w-4' />
                                </Button>
                            </div>
                            
                            <div className='mt-6'>
                                <h1 className='text-2xl font-bold mb-1'>{user?.fullname}</h1>
                                <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4'>
                                    <BadgeCheck className='h-4 w-4' /> Verified {user?.role === 'recruiter' ? 'Recruiter' : 'Candidate'}
                                </div>
                                <p className='text-sm text-muted-foreground'>
                                    {user?.profile?.bio || "No professional bio provided yet."}
                                </p>
                            </div>
                        </div>

                        <div className='mt-8 space-y-4'>
                            <div className='flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-border/50'>
                                <div className='p-2 rounded-lg bg-background shadow-sm'>
                                    <Mail className='h-5 w-5 text-primary' />
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-xs font-medium text-muted-foreground'>Email Address</span>
                                    <span className='text-sm font-semibold'>{user?.email}</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-border/50'>
                                <div className='p-2 rounded-lg bg-background shadow-sm'>
                                    <Contact className='h-5 w-5 text-primary' />
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-xs font-medium text-muted-foreground'>Phone Number</span>
                                    <span className='text-sm font-semibold'>{user?.phoneNumber || "Not provided"}</span>
                                </div>
                            </div>
                        </div>

                        <div className='mt-8 pt-8 border-t border-border'>
                            <h2 className='text-sm font-semibold text-foreground mb-4 flex items-center gap-2'>
                                <Briefcase className='h-4 w-4 text-primary' /> Skills
                            </h2>
                            <div className='flex flex-wrap gap-2'>
                                {user?.profile?.skills?.length !== 0 ? 
                                    user?.profile?.skills.map((item, index) => (
                                        <Badge key={index} variant="secondary" className='font-medium bg-muted/50 text-foreground border-border'>
                                            {item}
                                        </Badge>
                                    )) : 
                                    <span className='text-sm text-muted-foreground'>No skills provided.</span>
                                }
                            </div>
                        </div>

                        {user?.role === 'student' && (
                            <div className='mt-8 pt-8 border-t border-border'>
                                <h2 className='text-sm font-semibold text-foreground mb-4 flex items-center gap-2'>
                                    <FileText className='h-4 w-4 text-primary' /> Resume
                                </h2>
                                {user?.profile?.resume ? (
                                    <a 
                                        target='_blank' 
                                        rel="noreferrer" 
                                        href={user?.profile?.resume} 
                                        className='flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors'
                                    >
                                        <div className='flex items-center gap-3 overflow-hidden'>
                                            <FileText className='h-5 w-5 text-primary shrink-0' />
                                            <span className='text-sm font-medium text-primary truncate'>
                                                {user?.profile?.resumeOriginalName || "Resume.pdf"}
                                            </span>
                                        </div>
                                        <ExternalLink className='h-4 w-4 text-primary shrink-0 ml-2' />
                                    </a>
                                ) : (
                                    <div className='p-4 rounded-xl bg-muted/30 border border-dashed border-border text-center'>
                                        <p className='text-sm text-muted-foreground'>No resume uploaded</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Applications Table */}
                    {user?.role === 'student' ? (
                        <div className='lg:col-span-2'>
                            <div className='bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm h-full'>
                                <div className='flex items-center justify-between mb-8 border-b border-border pb-4'>
                                    <h1 className='text-2xl font-bold flex items-center gap-3'>
                                        Application History
                                    </h1>
                                    <Badge variant="secondary" className="font-semibold">
                                        {user?.appliedJobsCount || 0} Total
                                    </Badge>
                                </div>
                                <AppliedJobTable />
                            </div>
                        </div>
                    ) : (
                        <div className='lg:col-span-2'>
                            <div className='bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm h-full flex flex-col items-center justify-center text-center'>
                                <div className='h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6'>
                                    <BadgeCheck className='h-10 w-10 text-primary' />
                                </div>
                                <h2 className='text-2xl font-bold mb-3'>Recruiter Account</h2>
                                <p className='text-muted-foreground max-w-md'>
                                    You have authorization to manage jobs and companies. Use the navigation bar to access the specific dashboards for recruiting.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile