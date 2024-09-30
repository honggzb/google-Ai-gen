import { Menu } from 'lucide-react'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import SideNav from '@/components/nav/side-nav';

const MobileNav = () => {
  return (
    <div>
      <div className='px-3 mb-2 bg-slate-50 dark:bg-slate-900'>
        <Sheet>
          <SheetTrigger asChild>
            <button className='p-2'><Menu size={50} /></button>
          </SheetTrigger>
          <SheetContent side="left" className='w-[300px]'>
            <SideNav />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default MobileNav