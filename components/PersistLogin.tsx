// components/PersistLogin.tsx
"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '@/lib/redux/slices/userSlice';

export function PersistLogin({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('client_token='));
      
      if (tokenCookie) {
        // If token exists, restore user state from localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          dispatch(setUser(JSON.parse(savedUser)));
        }
      } else {
        // If no token, clear user state
        localStorage.removeItem('user');
        dispatch(clearUser());
      }
    };

    checkAuth();
  }, [dispatch]);

  return <>{children}</>;
}