// components/AutoLogout.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/lib/redux/slices/userSlice';
import { toast } from 'sonner';

export function AutoLogout() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    let logoutTimer: NodeJS.Timeout;

    const checkSession = () => {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('client_token='));
      
      if (!tokenCookie) {
        // Token is gone, perform logout
        dispatch(clearUser());
        router.push('/sign-in');
        toast.error('Session expired. Please login again.');
      }
    };

    // Check every minute
    const intervalId = setInterval(checkSession, 1800000); // 30 minutes in milliseconds


    // Cleanup
    return () => {
      clearInterval(intervalId);
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [dispatch, router]);

  return null;
}