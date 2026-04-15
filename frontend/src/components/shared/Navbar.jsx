import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Bell } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT, NOTIFICATION_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { ThemeToggle } from '../ThemeToggle'
import useGetNotifications from '@/hooks/useGetNotifications'
import { markNotificationAsRead } from '@/redux/notificationSlice'
import { Badge } from '../ui/badge'

const Navbar = () => {
    useGetNotifications();
    const { user } = useSelector(store => store.auth);
    const { notifications } = useSelector(store => store.notification);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const handleReadNotification = async (id) => {
        try {
            const res = await axios.put(`${NOTIFICATION_API_END_POINT}/${id}/read`, {}, { withCredentials: true });
            if (res.data.success) {
                dispatch(markNotificationAsRead(id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='bg-background border-b border-border fixed top-0 w-full z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8'>
                <div>
                    <Link to="/">
                        <h1 className='text-2xl font-bold'>Job<span className='text-primary'>Portal</span></h1>
                    </Link>
                </div>

                <div className='flex items-center gap-6'>
                    <ul className='hidden md:flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/dashboard" className='hover:text-primary transition-colors'>Dashboard</Link></li>
                                    <li><Link to="/admin/companies" className='hover:text-primary transition-colors'>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className='hover:text-primary transition-colors'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className='hover:text-primary transition-colors'>Home</Link></li>
                                    <li><Link to="/jobs" className='hover:text-primary transition-colors'>Jobs</Link></li>
                                </>
                            )
                        }
                    </ul>
                    <div className='flex items-center gap-4'>
                        <ThemeToggle />
                        {!user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="ghost">Login</Button></Link>
                                <Link to="/signup"><Button>Signup</Button></Link>
                            </div>
                        ) : (
                            <div className='flex items-center gap-4'>
                                {/* Notifications Popover */}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className='relative p-2 rounded-full hover:bg-muted transition-colors'>
                                            <Bell className='h-5 w-5 text-muted-foreground' />
                                            {unreadCount > 0 && (
                                                <span className='absolute top-1 right-1 flex h-2 w-2'>
                                                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                                                    <span className='relative inline-flex rounded-full h-2 w-2 bg-red-500'></span>
                                                </span>
                                            )}
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 shadow-lg p-0" align="end">
                                        <div className='flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50'>
                                            <h4 className='font-semibold text-sm'>Notifications</h4>
                                            {unreadCount > 0 && <Badge variant="secondary" className="text-xs">{unreadCount} New</Badge>}
                                        </div>
                                        <div className='max-h-[300px] overflow-y-auto'>
                                            {notifications.length === 0 ? (
                                                <div className='p-6 text-center text-sm text-muted-foreground'>
                                                    No new notifications.
                                                </div>
                                            ) : (
                                                notifications.map((n) => (
                                                    <div 
                                                        key={n._id} 
                                                        onClick={() => !n.isRead && handleReadNotification(n._id)}
                                                        className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-muted ${n.isRead ? 'opacity-60' : 'bg-primary/5'}`}
                                                    >
                                                        <p className={`text-sm ${!n.isRead && 'font-medium'}`}>
                                                            {n.message}
                                                        </p>
                                                        <span className='text-xs text-muted-foreground mt-1 block'>
                                                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(n.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </PopoverContent>
                                </Popover>

                                {/* Profile Popover */}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer h-9 w-9 ring-2 ring-transparent hover:ring-primary/20 transition-all">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-64 p-3 shadow-lg" align="end">
                                        <div className='flex items-center gap-3 p-2 bg-muted/30 rounded-lg mb-2'>
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                            </Avatar>
                                            <div className='flex flex-col truncate'>
                                                <h4 className='font-semibold text-sm truncate'>{user?.fullname}</h4>
                                                <p className='text-xs text-muted-foreground truncate'>{user?.profile?.bio || user?.role}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            {user && user.role !== 'recruiter' && (
                                                <Link to="/profile">
                                                    <Button variant="ghost" className="w-full justify-start text-sm">
                                                        <User2 className='h-4 w-4 mr-2 text-muted-foreground' /> View Profile
                                                    </Button>
                                                </Link>
                                            )}
                                            <Button onClick={logoutHandler} variant="ghost" className="w-full justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">
                                                <LogOut className='h-4 w-4 mr-2' /> Logout
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar