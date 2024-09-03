import React from 'react'
import Image from 'next/image'
import FlagIcon from '@/public/icons/flag.svg'

export default function LanguageSelector() {
  return (
    <button className="flex items-center justify-center w-7 h-7">
      <Image src={FlagIcon} alt="UK Flag" width={32} height={32} className="rounded-full" />
    </button>
  )
}