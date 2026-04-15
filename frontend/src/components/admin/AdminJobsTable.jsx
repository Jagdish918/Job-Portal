import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Calendar, ArrowUpRight, Users, Briefcase, Trash2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '../ui/badge'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setAllAdminJobs } from '@/redux/jobSlice'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => { 
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    return (
        <div className='overflow-hidden rounded-2xl border border-border/50'>
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow className="border-border/50 hover:bg-transparent">
                        <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6 pl-8'>Brand</TableHead>
                        <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6'>Position Title</TableHead>
                        <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6'>Posted On</TableHead>
                        <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6 text-right pr-8'>Action Control</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <AnimatePresence mode='popLayout'>
                        {filterJobs?.length > 0 ? (
                            filterJobs.map((job, index) => (
                                <motion.tr 
                                    key={job._id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className='group border-b border-border/50 hover:bg-muted/20 transition-colors cursor-default'
                                >
                                    <TableCell className='py-6 pl-8'>
                                        <div className='flex items-center gap-3'>
                                            <div className='p-1.5 rounded-lg bg-background border border-border/50 group-hover:scale-105 transition-transform'>
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={job?.company?.logo} className="object-contain" />
                                                </Avatar>
                                            </div>
                                            <span className='font-bold text-sm text-foreground opacity-70 group-hover:opacity-100 transition-opacity'>{job?.company?.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className='py-6'>
                                        <div className='space-y-1'>
                                            <span className='font-black text-lg group-hover:text-primary transition-colors flex items-center gap-2'>
                                                {job.title}
                                                <ArrowUpRight className='h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity' />
                                            </span>
                                            <div className='flex gap-2'>
                                                <Badge variant="outline" className="text-[9px] font-black uppercase border-blue-500/20 text-blue-500 bg-blue-500/5 px-1.5 py-0">{job.jobType}</Badge>
                                                <Badge variant="outline" className="text-[9px] font-black uppercase border-purple-500/20 text-purple-500 bg-purple-500/5 px-1.5 py-0">{job.salary} LPA</Badge>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className='py-6'>
                                        <div className='flex items-center gap-2 text-muted-foreground font-bold italic text-sm'>
                                            <Calendar className='h-3.5 w-3.5 text-primary/60' />
                                            {job.createdAt.split("T")[0]}
                                        </div>
                                    </TableCell>
                                    <TableCell className='py-6 text-right pr-8'>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className='p-2 rounded-lg hover:bg-muted transition-colors opacity-60 hover:opacity-100'>
                                                    <MoreHorizontal className='h-5 w-5' />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-48 p-2 rounded-2xl shadow-2xl border-border/50" align="end">
                                                <div className='space-y-1'>
                                                    <motion.div 
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => navigate(`/admin/companies/${job._id}`)} 
                                                        className='flex items-center gap-3 w-full p-3 rounded-xl hover:bg-muted cursor-pointer transition-colors font-black text-xs uppercase tracking-widest'
                                                    >
                                                        <Edit2 className='w-3.5 h-3.5 text-blue-500' />
                                                        <span>Prop. Edit</span>
                                                    </motion.div>
                                                        <motion.div 
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                            className='flex items-center gap-3 w-full p-3 rounded-xl hover:bg-muted cursor-pointer transition-colors font-black text-xs uppercase tracking-widest'
                                                        >
                                                            <Users className='w-3.5 h-3.5 text-purple-500' />
                                                            <span>Personnel</span>
                                                        </motion.div>
                                                        <motion.div 
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={async () => {
                                                                try {
                                                                    const res = await axios.delete(`${JOB_API_END_POINT}/delete/${job._id}`, { withCredentials: true });
                                                                    if (res.data.success) {
                                                                        toast.success(res.data.message);
                                                                        dispatch(setAllAdminJobs(allAdminJobs.filter(j => j._id !== job._id)));
                                                                    }
                                                                } catch (error) {
                                                                    toast.error(error.response?.data?.message || "Failed to delete job");
                                                                }
                                                            }} 
                                                            className='flex items-center gap-3 w-full p-3 rounded-xl hover:bg-destructive/10 cursor-pointer transition-colors font-black text-xs uppercase tracking-widest text-destructive'
                                                        >
                                                            <Trash2 className='w-3.5 h-3.5' />
                                                            <span>Delete</span>
                                                        </motion.div>
                                                    </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </motion.tr>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="py-24 text-center">
                                    <div className='flex flex-col items-center gap-4 text-muted-foreground'>
                                        <div className='p-4 rounded-full bg-muted/50'>
                                            <Briefcase className='h-8 w-8 opacity-20' />
                                        </div>
                                        <p className='font-black italic'>No active listings identified.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </AnimatePresence>
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable