"use client";

import React from 'react'
import { createCustomerPortalSession } from '@/actions/stripe';
import { Button } from '@/components/ui/button';

const BillingPage = () => {

  const handleClick = async () => {
    const response = await createCustomerPortalSession();
    window.location.href = response as string;
  }

  return (
    <div>
      <div className="p-10 m-3 rounded-lg bg-slate-100 dark:bg-slate-800 flex flex-col justify-center items-center">
        <h1 className='text-xl'>Billing</h1>
        <p>Manage your subscription plan</p>
      </div>
      <div className='p-4'>
        <Button onClick={handleClick}>Access Stripe Customer Portal</Button>
      </div>
    </div>
  )
}

export default BillingPage