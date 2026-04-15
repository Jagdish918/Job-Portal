import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, Briefcase, MapPin, DollarSign, ListChecks, Users2, Trophy, ArrowLeft, Plus, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if(!input.companyId) {
            toast.error("Please select a company first.");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen bg-background pb-20'>
            <Navbar />
            <div className='max-w-5xl mx-auto px-4 mt-12'>
                <motion.button 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate("/admin/jobs")}
                    className='flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-black uppercase tracking-widest text-[10px] italic mb-8'
                >
                    <ArrowLeft className='h-3 w-3' /> Back to Listings
                </motion.button>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-2xl'
                >
                    {/* Form Header */}
                    <div className='bg-primary/5 border-b border-border/50 p-10 md:p-12'>
                        <h1 className='text-4xl md:text-5xl font-black italic tracking-tighter mb-4'>
                            LAUNCH <span className='text-gradient'>ROLE</span>
                        </h1>
                        <p className='text-muted-foreground font-medium italic text-lg'>
                            Define the parameters for your next high-impact career opportunity.
                        </p>
                    </div>

                    <form onSubmit={submitHandler} className='p-10 md:p-12'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                            {/* Basic Info */}
                            <div className='space-y-6'>
                                <div className='space-y-2'>
                                    <Label className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 italic pl-1'>
                                        <Briefcase className='h-3 w-3 text-primary' /> Position Title
                                    </Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        placeholder="e.g. Senior Product Designer"
                                        value={input.title}
                                        onChange={changeEventHandler}
                                        className="h-14 border-2 focus:border-primary transition-all rounded-2xl font-bold text-lg"
                                        required
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <Label className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 italic pl-1'>
                                        <ListChecks className='h-3 w-3 text-primary' /> Key Responsibilities
                                    </Label>
                                    <Input
                                        type="text"
                                        name="description"
                                        placeholder="Briefly describe the mission of this role"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        className="h-14 border-2 focus:border-primary transition-all rounded-2xl font-medium"
                                        required
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 italic pl-1'>
                                        <Trophy className='h-3 w-3 text-primary' /> Core Requirements
                                    </Label>
                                    <Input
                                        type="text"
                                        name="requirements"
                                        placeholder="Must have skills, split by comma"
                                        value={input.requirements}
                                        onChange={changeEventHandler}
                                        className="h-14 border-2 focus:border-primary transition-all rounded-2xl font-medium"
                                        required
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 italic pl-1'>
                                        <DollarSign className='h-3 w-3 text-primary' /> Comp. Package (LPA)
                                    </Label>
                                    <Input
                                        type="text"
                                        name="salary"
                                        placeholder="e.g. 12-18"
                                        value={input.salary}
                                        onChange={changeEventHandler}
                                        className="h-14 border-2 focus:border-primary transition-all rounded-2xl font-bold text-lg tabular-nums"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Logistics */}
                            <div className='space-y-6'>
                                <div className='space-y-2'>
                                    <Label className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 italic pl-1'>
                                        <MapPin className='h-3 w-3 text-primary' /> Operating Base
                                    </Label>
                                    <Input
                                        type="text"
                                        name="location"
                                        placeholder="e.g. Remote, Mumbai, etc."
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        className="h-14 border-2 focus:border-primary transition-all rounded-2xl font-medium"
                                        required
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 italic pl-1'>
                                        <Plus className='h-3 w-3 text-primary' /> Employment Type
                                    </Label>
                                    <Input
                                        type="text"
                                        name="jobType"
                                        placeholder="Full-time, Contract, etc."
                                        value={input.jobType}
                                        onChange={changeEventHandler}
                                        className="h-14 border-2 focus:border-primary transition-all rounded-2xl font-medium"
                                        required
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 italic pl-1'>
                                        <Trophy className='h-3 w-3 text-primary' /> Exp. Paradigm
                                    </Label>
                                    <Input
                                        type="text"
                                        name="experience"
                                        placeholder="e.g. 3-5 Years"
                                        value={input.experience}
                                        onChange={changeEventHandler}
                                        className="h-14 border-2 focus:border-primary transition-all rounded-2xl font-medium"
                                        required
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 italic pl-1'>
                                        <Users2 className='h-3 w-3 text-primary' /> Headcount Allocation
                                    </Label>
                                    <Input
                                        type="number"
                                        name="position"
                                        value={input.position}
                                        onChange={changeEventHandler}
                                        className="h-14 border-2 focus:border-primary transition-all rounded-2xl font-bold text-lg tabular-nums"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Company Selection */}
                        <div className='mt-12 p-8 rounded-3xl bg-muted/30 border border-border/50'>
                             <Label className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 italic mb-4'>
                                <Building2 className='h-3 w-3 text-primary' /> Affiliated Entity
                            </Label>
                            {companies.length > 0 ? (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full h-14 border-2 focus:ring-primary rounded-2xl bg-background font-bold text-lg transition-all">
                                        <SelectValue placeholder="Select from Registered Ecosystem" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-border/50 shadow-2xl">
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem 
                                                    key={company._id} 
                                                    value={company?.name?.toLowerCase()}
                                                    className="py-3 font-bold cursor-pointer hover:text-primary transition-colors"
                                                >
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p className='text-sm text-red-500 font-black italic'>* No active entities identified. Please register a company first.</p>
                            )}
                        </div>

                        <div className='mt-12 flex flex-col md:flex-row gap-4 items-center justify-between border-t border-border/50 pt-10'>
                            <p className='text-xs font-bold text-muted-foreground opacity-60 italic'>
                                Ensure all data points are validated before final deployment.
                            </p>
                            {loading ? (
                                <Button className="w-full md:w-64 h-14 rounded-2xl px-12" disabled>
                                    <Loader2 className='mr-2 h-5 w-5 animate-spin' /> DEPLOYING...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full md:w-64 h-14 rounded-2xl px-12 font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-xs"
                                    disabled={companies.length === 0}
                                >
                                    LAUNCH POSITION
                                </Button>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default PostJob