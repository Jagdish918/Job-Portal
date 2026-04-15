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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, UserCheck } from 'lucide-react'
import { motion } from 'framer-motion'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Internal Server Error");
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
                    className='w-full lg:w-[45%] flex items-center justify-center p-8 bg-background border-r border-border/50'
                >
                    <div className='w-full max-w-md space-y-10'>
                        <div className='text-center lg:text-left'>
                            <h1 className='text-4xl font-black tracking-tight mb-2'>Welcome <span className='text-gradient'>Back</span></h1>
                            <p className='text-muted-foreground font-medium italic'>Enter your credentials to access your dashboard.</p>
                        </div>

                        <form onSubmit={submitHandler} className='space-y-6'>
                            <div className='space-y-2 group'>
                                <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <Mail className='h-4 w-4' /> Email Address
                                </Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="name@company.com"
                                    className="h-12 border-2 focus:border-primary transition-all rounded-xl font-medium"
                                />
                            </div>

                            <div className='space-y-2 group'>
                                <div className='flex justify-between items-center'>
                                    <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Lock className='h-4 w-4' /> Password
                                    </Label>
                                    <Button variant="link" className="text-xs font-bold p-0 text-muted-foreground hover:text-primary">Forgot Password?</Button>
                                </div>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className="h-12 border-2 focus:border-primary transition-all rounded-xl font-medium"
                                />
                            </div>

                            <div className='space-y-4'>
                                <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <UserCheck className='h-4 w-4' /> Account Role
                                </Label>
                                <RadioGroup className="flex gap-6">
                                    <div className="flex items-center space-x-3 bg-muted/30 px-4 py-2 rounded-xl border border-border cursor-pointer hover:bg-muted transition-all">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="h-4 w-4 accent-primary"
                                        />
                                        <Label className="font-bold cursor-pointer">Candidate</Label>
                                    </div>
                                    <div className="flex items-center space-x-3 bg-muted/30 px-4 py-2 rounded-xl border border-border cursor-pointer hover:bg-muted transition-all">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="h-4 w-4 accent-primary"
                                        />
                                        <Label className="font-bold cursor-pointer">Recruiter</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="w-full h-14 rounded-xl font-black text-lg tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all"
                            >
                                {loading ? <Loader2 className='mr-2 h-6 w-6 animate-spin' /> : 'SIGN IN'}
                            </Button>
                        </form>

                        <div className='text-center pt-4 font-medium'>
                            <span className='text-muted-foreground'>Don't have an account?</span>{' '}
                            <Link to="/signup" className='text-primary font-black underline decoration-2 underline-offset-4 hover:decoration-primary/60 transition-all'>Register Now</Link>
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
                        alt="Recruitment" 
                        className='relative z-10 w-[70%] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] animate-float'
                    />
                    
                    <div className='absolute bottom-12 left-12 right-12 glass-card p-8 rounded-2xl'>
                        <h3 className='text-2xl font-black mb-2'>Scale Your Career</h3>
                        <p className='font-medium italic text-muted-foreground'>Join thousands of professionals finding their next big opportunity.</p>
                    </div>
                </motion.div>
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
        </div>
    )
}

export default Login
