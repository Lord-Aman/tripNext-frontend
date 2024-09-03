import React from 'react'
import Image from 'next/image'
import AvatarIcon from '@/public/icons/avatar.svg'

export default function UserProfile() {
  return (
    <button className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700">Nick McMillan</span>
      <Image src={AvatarIcon} alt="User Avatar" width={48} height={48} className="rounded-full" />
    </button>
  )
}