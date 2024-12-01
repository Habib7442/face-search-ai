"use client"
import { useEffect, useState } from 'react';

const SuccessPage = ({params}) => {
  const { session_id } = params;
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      if (session_id) {
        const res = await fetch(`/api/verify-session?session_id=${session_id}`);
        const data = await res.json();
        setPaymentStatus(data.status);
      }
    };
    fetchSession();
  }, [session_id]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div>
        <h1 className="text-3xl font-bold mb-4">Payment Status</h1>
        <p>{paymentStatus ? `Your payment was ${paymentStatus}.` : 'Loading...'}</p>
      </div>
    </div>
  );
};

export default SuccessPage;
