import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, TextQuote, ImagePlus, Layout } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { motion } from 'framer-motion'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null
            });
        }
    }, [singleCompany]);

    return (
        <div className='min-h-screen bg-background pb-20'>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 mt-12'>
                <motion.button 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate("/admin/companies")}
                    className='flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-black uppercase tracking-widest text-[10px] italic mb-8'
                >
                    <ArrowLeft className='h-3 w-3' /> Back to Ecosystem
                </motion.button>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-2xl'
                >
                    {/* Header Section */}
                    <div className='bg-primary/5 border-b border-border/50 p-10 md:p-12'>
                        <div className='flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] mb-4 italic'>
                            <Layout className='h-4 w-4' /> Enterprise Orchestration
                        </div>
                        <h1 className='text-4xl md:text-5xl font-black italic tracking-tighter'>
                            COMPANY <span className='text-gradient'>SETUP</span>
                        </h1>
                        <p className='text-muted-foreground font-medium italic mt-2'>Configure your corporate identity and brand presence.</p>
                    </div>

                    <form onSubmit={submitHandler} className='p-10 md:p-12'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mb-12'>
                            <div className='space-y-6'>
                                <div className='space-y-2'>
                                    <Label className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 italic pl-1'>
                                        <Building2 className='h-3 w-3 text-primary' /> Legal Name
                                    </Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="e.g. Acme Corporation"
                                        value={input.name}
                                        onChange={changeEventHandler}
                                        className="h-14 border-2 focus:border-primary transition-all rounded-2xl font-bold text-lg"
                                        required
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 italic pl-1'>
                                        <TextQuote className='h-3 w-3 text-primary' /> Mission Statement
                                    </Label>
                                    <Input
                                        type="text"
                                        name="description"
                                        placeholder="Briefly describe your company's vision"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        className="h-14 border-2 focus:border-primary transition-all rounded-2xl font-medium"
                                    />
                                </div>
                            </div>

                            <div className='space-y-6'>
                                <div className='space-y-2'>
                                    <Label className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 italic pl-1'>
                                        <Globe className='h-3 w-3 text-primary' /> Digital Presence
                                    </Label>
                                    <Input
                                        type="text"
                                        name="website"
                                        placeholder="https://example.com"
                                        value={input.website}
                                        onChange={changeEventHandler}
                                        className="h-14 border-2 focus:border-primary transition-all rounded-2xl font-medium"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 italic pl-1'>
                                        <MapPin className='h-3 w-3 text-primary' /> Headquarters
                                    </Label>
                                    <Input
                                        type="text"
                                        name="location"
                                        placeholder="e.g. Mumbai, India"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        className="h-14 border-2 focus:border-primary transition-all rounded-2xl font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Logo Upload Section */}
                        <div className='p-8 rounded-3xl bg-muted/30 border border-border/50 mb-12'>
                             <Label className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 italic mb-6'>
                                <ImagePlus className='h-3 w-3 text-primary' /> Visual Identity (Logo)
                            </Label>
                            <div className='relative group border-2 border-dashed border-border group-hover:border-primary transition-colors rounded-2xl p-8 text-center'>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className='space-y-2'>
                                    <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2 text-primary'>
                                        <ImagePlus className='h-6 w-6' />
                                    </div>
                                    <p className='text-sm font-bold text-foreground'>Drag and drop or <span className='text-primary underline'>browse files</span></p>
                                    <p className='text-xs text-muted-foreground font-medium italic'>Supports PNG, JPG (SVG recommended). Max 5MB.</p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='flex flex-col md:flex-row gap-4 items-center justify-between border-t border-border/50 pt-10'>
                            <p className='text-[10px] font-black uppercase tracking-widest text-muted-foreground italic px-2'>
                                Changes will be reflected across all job listings.
                            </p>
                            {loading ? (
                                <Button className="w-full md:w-64 h-14 rounded-2xl" disabled>
                                    <Loader2 className='mr-2 h-5 w-5 animate-spin' /> SYNCHRONIZING...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full md:w-64 h-14 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-xs"
                                >
                                    UPDATE ENTITY
                                </Button>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default CompanySetup