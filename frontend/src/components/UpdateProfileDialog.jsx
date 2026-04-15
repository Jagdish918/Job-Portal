import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, User, Mail, Phone, FileText, BadgeCheck, MessageSquare, X, Camera, ImagePlus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || "",
        profilePhoto: null
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const profilePhotoChangeHandler = (e) => {
        const profilePhoto = e.target.files?.[0];
        setInput({ ...input, profilePhoto })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        if (input.profilePhoto) {
            formData.append("profilePhoto", input.profilePhoto);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] rounded-3xl p-8 border-border/50 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className='text-3xl font-black italic tracking-tighter'>
                        REFINE <span className='text-gradient'>PROFILE</span>
                    </DialogTitle>
                    <DialogDescription className='text-sm font-medium text-muted-foreground italic pt-1'>Update your professional identity and credentials.</DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler} className='space-y-6 mt-4'>
                    <div className='grid gap-5'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="fullname" className="text-right text-xs font-black uppercase tracking-widest text-muted-foreground">Name</Label>
                            <div className='col-span-3 relative'>
                                <User className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50' />
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="pl-10 h-11 border-2 focus:border-primary transition-all rounded-xl font-medium"
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className="text-right text-xs font-black uppercase tracking-widest text-muted-foreground">Email</Label>
                            <div className='col-span-3 relative'>
                                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50' />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="pl-10 h-11 border-2 focus:border-primary transition-all rounded-xl font-medium"
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="phoneNumber" className="text-right text-xs font-black uppercase tracking-widest text-muted-foreground">Number</Label>
                            <div className='col-span-3 relative'>
                                <Phone className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50' />
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="pl-10 h-11 border-2 focus:border-primary transition-all rounded-xl font-medium"
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="bio" className="text-right text-xs font-black uppercase tracking-widest text-muted-foreground">Bio</Label>
                            <div className='col-span-3 relative'>
                                <MessageSquare className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50' />
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="pl-10 h-11 border-2 focus:border-primary transition-all rounded-xl font-medium"
                                />
                            </div>
                        </div>
                        {user?.role === 'student' && (
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right text-xs font-black uppercase tracking-widest text-muted-foreground">Skills</Label>
                                <div className='col-span-3 relative'>
                                    <BadgeCheck className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50' />
                                    <Input
                                        id="skills"
                                        name="skills"
                                        value={input.skills}
                                        onChange={changeEventHandler}
                                        placeholder="React, Node, CSS..."
                                        className="pl-10 h-11 border-2 focus:border-primary transition-all rounded-xl font-medium"
                                    />
                                </div>
                            </div>
                        )}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="profilePhoto" className="text-right text-xs font-black uppercase tracking-widest text-muted-foreground">Photo</Label>
                            <div className='col-span-3 relative'>
                                <Camera className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50' />
                                <Input
                                    id="profilePhoto"
                                    name="profilePhoto"
                                    type="file"
                                    accept="image/*"
                                    onChange={profilePhotoChangeHandler}
                                    className="pl-10 h-11 border-2 focus:border-primary transition-all rounded-xl pt-2 font-medium cursor-pointer"
                                />
                            </div>
                        </div>
                        {user?.role === 'student' && (
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className="text-right text-xs font-black uppercase tracking-widest text-muted-foreground">Resume</Label>
                                <div className='col-span-3 relative'>
                                    <FileText className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50' />
                                    <Input
                                        id="file"
                                        name="file"
                                        type="file"
                                        accept="application/pdf"
                                        onChange={fileChangeHandler}
                                        className="pl-10 h-11 border-2 focus:border-primary transition-all rounded-xl pt-2 font-medium cursor-pointer"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter className="mt-8">
                        {loading ? (
                            <Button className="w-full h-12 rounded-xl" disabled>
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Finalizing Update...
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                className="w-full h-12 rounded-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all"
                            >
                                SAVE CHANGES
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog