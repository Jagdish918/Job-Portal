import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, X, Sparkles, Layout } from 'lucide-react'
import { motion } from 'framer-motion'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();
    
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{ 'Content-Type':'application/json' },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to register company.");
        }
    }

    return (
        <div className='min-h-screen bg-background'>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-20'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-card border border-border rounded-[2.5rem] p-12 md:p-16 shadow-2xl relative overflow-hidden'
                >
                    {/* Decorative Elements */}
                    <div className='absolute top-0 right-0 p-12 opacity-5'>
                        <Building2 className='h-48 w-48' />
                    </div>

                    <div className='relative z-10'>
                        <div className='flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] mb-6 italic'>
                            <Layout className='h-4 w-4' /> Setup Wizard
                        </div>
                        
                        <div className='mb-12'>
                            <h1 className='text-4xl md:text-5xl font-black italic tracking-tighter mb-4'>
                                YOUR COMPANY <span className='text-gradient'>BRAND</span>
                            </h1>
                            <p className='text-muted-foreground font-medium italic text-lg max-w-xl'>
                                Define the identity of your organization. This identifier will be visible to all potential candidates and used for high-level management.
                            </p>
                        </div>

                        <div className='space-y-4 max-w-xl'>
                            <div className='space-y-2'>
                                <Label className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 italic pl-1'>
                                    <Sparkles className='h-3 w-3 text-primary' /> Legal Entity Name
                                </Label>
                                <Input
                                    type="text"
                                    className="h-16 border-2 focus:border-primary transition-all rounded-2xl font-bold text-xl px-6"
                                    placeholder="Google, Microsoft, SpaceX etc."
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </div>
                            
                            <div className='flex items-center gap-4 pt-8'>
                                <Button 
                                    variant="outline" 
                                    onClick={() => navigate("/admin/companies")}
                                    className="h-14 rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] hover:bg-muted transition-all"
                                >
                                    <X className='mr-2 h-4 w-4' /> Discard
                                </Button>
                                <Button 
                                    onClick={registerNewCompany}
                                    className="h-14 rounded-2xl px-12 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex-1 md:flex-none"
                                >
                                    PROCEED TO SETUP
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
                
                <p className='text-center mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic opacity-50'>
                    Enterprise-Grade Orchestration • JobPortal Control Panel
                </p>
            </div>
        </div>
    )
}

export default CompanyCreate