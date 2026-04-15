import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Calendar, ArrowUpRight, Trash2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setSingleCompany } from '@/redux/companySlice'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    return (
        <div className='overflow-hidden rounded-2xl border border-border/50'>
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow className="border-border/50 hover:bg-transparent">
                        <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6 pl-8'>Entity Logo</TableHead>
                        <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6'>Company Name</TableHead>
                        <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6'>Registration Date</TableHead>
                        <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6 text-right pr-8'>Action Control</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <AnimatePresence>
                        {filterCompany?.length > 0 ? (
                            filterCompany.map((company, index) => (
                                <motion.tr 
                                    key={company._id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className='group border-b border-border/50 hover:bg-muted/20 transition-colors'
                                >
                                    <TableCell className='py-6 pl-8'>
                                        <div className='p-1 rounded-xl bg-background border border-border/50 w-fit group-hover:scale-110 transition-transform shadow-inner'>
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={company.logo} className="object-contain" />
                                            </Avatar>
                                        </div>
                                    </TableCell>
                                    <TableCell className='py-6'>
                                        <span className='font-black text-lg group-hover:text-primary transition-colors flex items-center gap-2'>
                                            {company.name}
                                            <ArrowUpRight className='h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity' />
                                        </span>
                                    </TableCell>
                                    <TableCell className='py-6'>
                                        <div className='flex items-center gap-2 text-muted-foreground font-bold italic text-sm'>
                                            <Calendar className='h-3.5 w-3.5 text-primary/60' />
                                            {company.createdAt.split("T")[0]}
                                        </div>
                                    </TableCell>
                                    <TableCell className='py-6 text-right pr-8'>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className='p-2 rounded-lg hover:bg-muted transition-colors opacity-60 hover:opacity-100'>
                                                    <MoreHorizontal className='h-5 w-5' />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-40 p-2 rounded-2xl shadow-2xl border-border/50" align="end">
                                                <div className='flex flex-col gap-1'>
                                                    <motion.div 
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                                        className='flex items-center gap-3 w-full p-3 rounded-xl hover:bg-muted cursor-pointer transition-colors font-black text-xs uppercase tracking-widest'
                                                    >
                                                        <Edit2 className='w-3.5 h-3.5 text-primary' />
                                                        <span>Prop. Edit</span>
                                                    </motion.div>
                                                    <motion.div 
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={async () => {
                                                            try {
                                                                const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${company._id}`, { withCredentials: true });
                                                                if (res.data.success) {
                                                                    toast.success(res.data.message);
                                                                    setFilterCompany(filterCompany.filter(c => c._id !== company._id));
                                                                    // Update the main state to trigger re-renders natively, but since companies are fetched on the parent, it will refresh if parent remounts.
                                                                }
                                                            } catch (error) {
                                                                toast.error(error.response?.data?.message || "Failed to delete company");
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
                                <TableCell colSpan={4} className="py-20 text-center text-muted-foreground font-black italic">
                                    No registered entities identified.
                                </TableCell>
                            </TableRow>
                        )}
                    </AnimatePresence>
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable