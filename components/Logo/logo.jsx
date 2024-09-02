import React from 'react'
import Image from 'next/image'
import LogoIcon from '@/public/icons/Logo.svg'

export default function Logo() {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      <Image src={LogoIcon} height={42} width={40}/>
      <span className="text-2xl font-semibold">Cleartripp</span>
    </div>
  )
}