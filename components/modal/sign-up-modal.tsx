import React from 'react'
import { useUsage } from '@/context/usage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const SignUpModal = () => {

  const { openModal, setOpenModal } = useUsage();

  return (
    <Dialog open={openModal} onOpenChange={() => openModal ? setOpenModal(!openModal) : setOpenModal(openModal)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>🚀Unlock unlimited AI-powered content!</DialogTitle>
          <DialogDescription>
            <br/>
            <p>🎉 Congras! You have generated 10,000 words with our AI tools. This is amazing!</p>
            <br/>
            <p>🔒 Ready to take your content creation to the next level? Upgrade to a paid plan and enjoy?</p>
            <ul className='m-5'>
              <li>🔥Unlimited AI-Powered content</li>
              <li>🔥Primority support</li>
              <li>🔥No ads</li>
            </ul>
            <p>💡Don't let your creativity hit a wall, upgrade now and keep the ideas flowing!</p>
            <div className="m-4 text-center">
              <Link href="/membership"><Button>Join Membership</Button></Link>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )

}

export default SignUpModal