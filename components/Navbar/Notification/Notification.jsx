
import React from 'react'
import Image from 'next/image'
import NotificationIcon from '@/public/icons/notification.svg'

export default function Notification() {
  return (
    <button className="flex relative items-center justify-center w-8 h-8">
      <Image src={NotificationIcon} alt="notification" width={32} height={32} className="rounded-full" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        1
      </span>
    </button>
  )
}