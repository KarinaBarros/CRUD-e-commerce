'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useAuth = () => {
 const router = useRouter();

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/verify-token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
    } catch (err) {
      console.log('acesso negado');
      router.push('/login');
    }
  };

  fetchData();
}, []);

};

export default useAuth;
