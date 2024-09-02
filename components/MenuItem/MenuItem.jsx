import React from 'react'
import Link from 'next/link'

export default function MenuItem({ icon, label, href, className }) {
  return (
    <Link href={href} className={`flex items-center space-x-4 px-4 py-3 rounded-md hover:bg-gray-100 ${className}`}>
      {icon}
      <span>{label}</span>
    </Link>
  )
}