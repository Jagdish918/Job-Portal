import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { ArrowLeft, MapPin, Briefcase, Users, Clock, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...(singleJob?.applications || []), { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job?.applications?.some(application => application.applicant === user?._id) || false)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='bg-background min-h-screen pb-20 pt-24'>
            <Navbar />
            
            <div className='max-w-6xl mx-auto px-4 py-8'>
                {/* Back Navigation */}
                <button 
                    onClick={() => navigate(-1)} 
                    className='flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground mb-8 transition-colors'
                >
                    <ArrowLeft className='h-4 w-4' /> Back to Jobs
                </button>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                    {/* Main Content */}
                    <div className='lg:col-span-2 space-y-8'>
                        <div className='space-y-6'>
                            <h1 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
                                {singleJob?.title}
                            </h1>

                            <div className='flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground'>
                                <div className='flex items-center gap-1.5'>
                                    <Building2 className='h-4 w-4 text-primary' />
                                    <span>{singleJob?.company?.name}</span>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    <MapPin className='h-4 w-4 text-primary' />
                                    <span>{singleJob?.location || 'India'}</span>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    <Clock className='h-4 w-4 text-primary' />
                                    <span>Posted {singleJob?.createdAt?.split("T")[0]}</span>
                                </div>
                            </div>

                            <div className='flex flex-wrap gap-2 pt-2'>
                                <Badge className='px-4 py-1 text-primary bg-primary/10' variant="secondary">{singleJob?.position} Positions</Badge>
                                <Badge className='px-4 py-1 text-[#F83002] bg-[#F83002]/10' variant="secondary">{singleJob?.jobType}</Badge>
                                <Badge className='px-4 py-1 text-[#7209b7] bg-[#7209b7]/10' variant="secondary">{singleJob?.salary} LPA</Badge>
                            </div>
                        </div>

                        <div className='pt-8 border-t border-border space-y-6'>
                            <h2 className='text-xl font-bold text-foreground'>Role Description</h2>
                            <p className='text-base leading-relaxed text-muted-foreground whitespace-pre-wrap'>
                                {singleJob?.description}
                            </p>
                        </div>

                        {/* Interactive Perks section */}
                        <div className='p-6 rounded-2xl bg-muted/50 border border-border mt-8'>
                            <h3 className='text-lg font-bold flex items-center gap-2 mb-4'>
                                <ShieldCheck className='text-green-500 h-5 w-5' /> What you can expect
                            </h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                {['Competitive Compensation', 'Global Remote Optional', 'Career Development', 'Health Benefits'].map((benefit, i) => (
                                    <div key={i} className='flex items-center gap-2 font-medium text-sm text-muted-foreground'>
                                        <CheckCircle2 className='h-4 w-4 text-primary' />
                                        {benefit}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar quick Apply */}
                    <div className='space-y-6'>
                        <div className='bg-card p-6 rounded-2xl sticky top-24 border border-border shadow-sm'>
                            <h3 className='font-bold text-lg mb-6 border-b border-border pb-4'>Job Summary</h3>
                            
                            <div className='space-y-5 mb-8'>
                                <div className='flex items-center justify-between'>
                                    <span className='text-muted-foreground text-sm flex items-center gap-2'>
                                        <Briefcase className='h-4 w-4' /> Experience
                                    </span>
                                    <span className='font-semibold'>{singleJob?.experience} Years</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-muted-foreground text-sm flex items-center gap-2'>
                                        <Users className='h-4 w-4' /> Applicants
                                    </span>
                                    <span className='font-semibold'>{singleJob?.applications?.length || 0}</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-muted-foreground text-sm flex items-center gap-2'>
                                        <Building2 className='h-4 w-4' /> Company Phase
                                    </span>
                                    <span className='font-semibold'>Actively Hiring</span>
                                </div>
                            </div>

                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`w-full h-12 rounded-xl font-bold transition-all ${isApplied ? 'bg-muted text-muted-foreground cursor-not-allowed border border-border' : 'bg-primary hover:bg-primary/90'}`}>
                                {isApplied ? 'Applied' : 'Apply Now'}
                            </Button>
                            
                            <p className='text-xs text-center text-muted-foreground mt-4'>
                                By applying, you agree to the platform's terms of service.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription