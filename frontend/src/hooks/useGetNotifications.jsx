import { setNotifications } from '@/redux/notificationSlice';
import { NOTIFICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetNotifications = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!user) return; // Guard fetch calls with authentication checks
            try {
                const res = await axios.get(`${NOTIFICATION_API_END_POINT}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setNotifications(res.data.notifications));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchNotifications();
    }, [dispatch, user]); // Added user to dependency array
};

export default useGetNotifications;

