import React from 'react'
import { UserProfile } from '@clerk/nextjs';

const SettingPage = () => {
  return (
    <div className='p-5'>
      <UserProfile />
    </div>
  )
}

export default SettingPage