import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Briefcase, Building2, PackageOpen } from 'lucide-react'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    
    const getStatusStyle = (status) => {
        switch(status?.toLowerCase()) {
            case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'accepted': return 'bg-green-500/10 text-green-500 border-green-500/20';
            default: return 'bg-muted text-muted-foreground border-border/50';
        }
    }

    return (
        <div className='overflow-hidden rounded-2xl border border-border/50 bg-background/50'>
            <Table>
                <TableHeader className="bg-muted/30">
                    <TableRow className="border-border/50 hover:bg-transparent">
                        <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6 pl-8'>Submission</TableHead>
                        <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6'>Position</TableHead>
                        <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6'>Organization</TableHead>
                        <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6 text-right pr-8'>Current Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <AnimatePresence mode='popLayout'>
                        {allAppliedJobs.length > 0 ? (
                            allAppliedJobs.map((appliedJob, index) => (
                                <motion.tr 
                                    key={appliedJob._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className='group border-border/50 hover:bg-muted/10 transition-colors'
                                >
                                    <TableCell className='py-6 pl-8'>
                                        <div className='flex items-center gap-2 text-muted-foreground font-bold italic text-sm'>
                                            <Calendar className='h-3.5 w-3.5 text-primary/60' />
                                            {appliedJob?.createdAt?.split("T")[0]}
                                        </div>
                                    </TableCell>
                                    <TableCell className='py-6 font-black text-foreground group-hover:text-primary transition-colors'>
                                        {appliedJob.job?.title}
                                    </TableCell>
                                    <TableCell className='py-6'>
                                        <div className='flex items-center gap-2 font-bold text-muted-foreground'>
                                            <Building2 className='h-3.5 w-3.5 opacity-50' />
                                            {appliedJob.job?.company?.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6 text-right pr-8">
                                        <Badge variant="outline" className={`px-4 py-1 rounded-full font-black text-[9px] uppercase tracking-widest border transition-all shadow-sm ${getStatusStyle(appliedJob.status)}`}>
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </motion.tr>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="py-24 text-center">
                                    <div className='flex flex-col items-center gap-4 text-muted-foreground opacity-50'>
                                        <PackageOpen className='h-12 w-12' />
                                        <p className='font-black italic'>Your application queue is currently empty.</p>
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

export default AppliedJobTable