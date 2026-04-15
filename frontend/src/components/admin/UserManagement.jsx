import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { Users, Search, ShieldCheck, Mail, Phone, User as UserIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/all`, { withCredentials: true });
                if (res.data.success) setUsers(res.data.users);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const filteredUsers = (users || []).filter(u => 
        u?.fullname?.toLowerCase().includes((filter || "").toLowerCase()) || 
        u?.email?.toLowerCase().includes((filter || "").toLowerCase())
    );

    const recruitersCount = (users || []).filter(u => u?.role === 'recruiter').length;
    const studentsCount = (users || []).filter(u => u?.role === 'student').length;

    return (
        <div className='min-h-screen bg-background pb-20'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-12'>
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mb-12'
                >
                    <div className='flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 italic'>
                        <Users className='h-4 w-4 text-primary' /> User Management
                    </div>
                    <h1 className='text-4xl font-black tracking-tight mb-2'>Platform <span className='text-gradient'>Registry</span></h1>
                    <div className='flex flex-wrap gap-4 mt-4'>
                        <Badge variant="secondary" className="px-4 py-1 rounded-full text-[10px] font-black tracking-widest bg-primary/10 text-primary border-none uppercase">TOTAL: {users.length}</Badge>
                        <Badge variant="outline" className="px-4 py-1 rounded-full text-[10px] font-black tracking-widest border-blue-500/20 text-blue-500 uppercase">RECRUITERS: {recruitersCount}</Badge>
                        <Badge variant="outline" className="px-4 py-1 rounded-full text-[10px] font-black tracking-widest border-blue-300/20 text-blue-400 uppercase">STUDENTS: {studentsCount}</Badge>
                    </div>
                </motion.div>

                <div className='bg-card border border-border rounded-3xl p-8 shadow-sm'>
                    <div className='flex items-center gap-4 mb-8 bg-muted/30 p-2 rounded-2xl w-full md:w-96 border border-border/50'>
                        <div className='pl-3 text-muted-foreground'><Search className='h-5 w-5' /></div>
                        <Input
                            className="border-none bg-transparent focus-visible:ring-0 placeholder:italic font-medium"
                            placeholder="Search by name or email..."
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>

                    <div className='overflow-hidden rounded-2xl border border-border/50'>
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6 pl-8'>Full Name</TableHead>
                                    <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6'>Email Address</TableHead>
                                    <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6'>Phone</TableHead>
                                    <TableHead className='font-black uppercase tracking-widest text-[10px] italic py-6'>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={4} className="py-20 text-center font-bold italic">Loading Registry...</TableCell></TableRow>
                                ) : filteredUsers.length > 0 ? (
                                    filteredUsers.map((u, i) => (
                                        <TableRow key={u._id} className='hover:bg-muted/20 transition-colors'>
                                            <TableCell className='py-5 pl-8 font-bold flex items-center gap-3'>
                                                <div className='p-2 rounded-lg bg-primary/10'><UserIcon className='h-4 w-4 text-primary' /></div>
                                                {u.fullname}
                                            </TableCell>
                                            <TableCell className='py-5 font-medium text-muted-foreground flex items-center gap-2'><Mail className='h-3 w-3 opacity-50' />{u.email}</TableCell>
                                            <TableCell className='py-5 font-medium text-muted-foreground flex items-center gap-2'><Phone className='h-3 w-3 opacity-50' />{u.phoneNumber}</TableCell>
                                            <TableCell className='py-5'>
                                                <Badge variant={u.role === 'recruiter' ? "default" : "outline"} className={`uppercase text-[10px] font-black tracking-widest ${u.role === 'recruiter' ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-500/20 text-blue-500'}`}>
                                                    {u.role === 'recruiter' ? <ShieldCheck className='h-3 w-3 mr-1' /> : null}
                                                    {u.role}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={4} className="py-20 text-center font-black italic opacity-30">No users identified in registries.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserManagement;
