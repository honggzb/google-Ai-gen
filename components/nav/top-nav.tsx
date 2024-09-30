'use client';

import React from 'react'
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import {Toaster} from 'react-hot-toast';
import { useUsage } from '@/context/usage';

const TopNav = () => {

  const { isSignedIn, user } = useUser();
  const { subscribed } = useUsage();

  return (
    <nav className='flex justify-between items-center p-5 shadow'>
      <Toaster />
      <Link href='/'>AI</Link>
      { subscribed && <Link href="/membership">🔥Join free or $9.99/month</Link> }
      <div className='flex items-center'>
        {isSignedIn && <Link href='/dashboard' className='mr-3'>{`${user.fullName}'s CMS Dashboard`}</Link>}
        <SignedOut> <SignInButton /> </SignedOut>
        <SignedIn> <UserButton /> </SignedIn>
      <div className='ml-2'><ThemeToggle /></div>
      </div>
    </nav>
  );
}

export default TopNav