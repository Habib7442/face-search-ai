"use client"
import { useState } from 'react';
import { AuthLayout } from '@/components/Auth/AuthLayout';
import { SignInForm } from '@/components/Auth/SignInForm';
import { SignUpForm } from '@/components/Auth/SignUpForm';

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <AuthLayout isSignUp={isSignUp} onToggleMode={() => setIsSignUp(!isSignUp)}>
      {isSignUp ? <SignUpForm /> : <SignInForm />}
    </AuthLayout>
  );
}

export default AuthPage;