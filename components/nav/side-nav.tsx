'use client'
import React from 'react'
import { LayoutDashboard, FileClock, WalletCards, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import UsagePage from '@/components/nav/usage';
import SignUpModal from '@/components/modal/sign-up-modal';

const SideNav = () => {
  const path = usePathname();
  const menu = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      name: 'History',
      icon: FileClock,
      path: '/dashboard/history'
    },
    {
      name: 'Billing',
      icon: WalletCards,
      path: '/dashboard/billing'
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/dashboard/settings'
    },
  ]
  return (
    <div className='flex flex-col h-full'>
      <ul className='flex-1 spac-y-2'>
        {menu.map((item, i) => (
          <li key={i}
            className={`${path === item.path ? 'border-primary text-primary' : 'hover:border-primary hover:text-white hover:bg-slate-600'} flex m-2 mr-2 p-2 rounded-lg cursor-pointer border`}>
            <div className='flex justify-start w-full'>
              <Link href={item.path} className='flex'>
                <item.icon />{" "}
                {/** use hidden class to show only icon in small screen */}
                <span className='ml-2 hidden md:inline'>{item.name}</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className='pb-20 mt-auto'>
        <UsagePage />
        <SignUpModal />
      </div>
    </div>
  )
}

export default SideNav