import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, Mail, Lock, User, Phone, Image as ImageIcon, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

    return (
        <div className='min-h-screen bg-background pt-32'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-8 py-10'>
                <div className='flex flex-col lg:flex-row min-h-[calc(100vh-164px)] overflow-hidden rounded-[2.5rem] border border-border/50 shadow-2xl bg-card'>
                {/* Left Side: Form */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className='w-full lg:w-[50%] flex items-center justify-center p-8 bg-card border-r border-border/50'
                >
                    <div className='w-full max-w-2xl space-y-8'>
                        <div className='text-center lg:text-left'>
                            <h1 className='text-4xl font-black tracking-tight mb-2'>Create <span className='text-gradient'>Account</span></h1>
                            <p className='text-muted-foreground font-medium italic'>Join our network of elite professionals and top companies.</p>
                        </div>

                        <form onSubmit={submitHandler} className='space-y-5'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <User className='h-3 w-3' /> Full Name
                                    </Label>
                                    <Input
                                        type="text"
                                        value={input.fullname}
                                        name="fullname"
                                        onChange={changeEventHandler}
                                        placeholder="John Doe"
                                        className="h-11 border-2 focus:border-primary transition-all rounded-xl font-medium"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Mail className='h-3 w-3' /> Email address
                                    </Label>
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="john@example.com"
                                        className="h-11 border-2 focus:border-primary transition-all rounded-xl font-medium"
                                    />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Phone className='h-3 w-3' /> Phone Number
                                    </Label>
                                    <Input
                                        type="text"
                                        value={input.phoneNumber}
                                        name="phoneNumber"
                                        onChange={changeEventHandler}
                                        placeholder="+1 234 567 890"
                                        className="h-11 border-2 focus:border-primary transition-all rounded-xl font-medium"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Lock className='h-3 w-3' /> Password
                                    </Label>
                                    <Input
                                        type="password"
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="••••••••"
                                        className="h-11 border-2 focus:border-primary transition-all rounded-xl font-medium"
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row gap-6 p-6 bg-muted/30 rounded-2xl border border-border/50 items-center justify-between'>
                                <div className='space-y-3 w-full'>
                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Briefcase className='h-3 w-3' /> Join As
                                    </Label>
                                    <RadioGroup className="flex gap-4">
                                        <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg border border-border cursor-pointer">
                                            <Input
                                                type="radio"
                                                name="role"
                                                value="student"
                                                checked={input.role === 'student'}
                                                onChange={changeEventHandler}
                                                className="h-4 w-4 accent-primary"
                                            />
                                            <Label className="font-bold cursor-pointer text-sm">Candidate</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg border border-border cursor-pointer">
                                            <Input
                                                type="radio"
                                                name="role"
                                                value="recruiter"
                                                checked={input.role === 'recruiter'}
                                                onChange={changeEventHandler}
                                                className="h-4 w-4 accent-primary"
                                            />
                                            <Label className="font-bold cursor-pointer text-sm">Recruiter</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className='space-y-3 w-full'>
                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <ImageIcon className='h-3 w-3' /> Profile Picture
                                    </Label>
                                    <Input
                                        accept="image/*"
                                        type="file"
                                        onChange={changeFileHandler}
                                        className="cursor-pointer h-10 bg-background border-2 border-dashed border-border hover:border-primary transition-all rounded-lg p-1 text-xs"
                                    />
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="w-full h-14 rounded-xl font-black text-lg tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all mt-4"
                            >
                                {loading ? <Loader2 className='mr-2 h-6 w-6 animate-spin' /> : 'CREATE ACCOUNT'}
                            </Button>
                        </form>

                        <div className='text-center font-medium'>
                            <span className='text-muted-foreground'>Already have an account?</span>{' '}
                            <Link to="/login" className='text-primary font-black underline decoration-2 underline-offset-4 hover:decoration-primary/60 transition-all'>Sign In</Link>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Image/Illustration */}
                <motion.div 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className='hidden lg:flex flex-1 relative bg-muted items-center justify-center overflow-hidden'
                >
                    <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 z-0'></div>
                    <img 
                        src="/src/assets/login_illustration.png" 
                        alt="Join Us" 
                        className='relative z-10 w-[70%] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] animate-float'
                    />
                    
                    <div className='absolute bottom-12 left-12 right-12 glass-card p-8 rounded-2xl'>
                        <h3 className='text-2xl font-black mb-2'>Join the Community</h3>
                        <p className='font-medium italic text-muted-foreground'>Start your professional journey with thousands of world-class teams.</p>
                    </div>
                </motion.div>
                </div>
            </div>
            
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}

export default Signup
