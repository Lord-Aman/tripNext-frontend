import React from 'react'
import Logo from '@/components/Logo/logo'
import MenuItem from '@/components/MenuItem/MenuItem'
import { Home, Calendar, Plane, Bed, Car, Landmark, HelpCircle } from 'lucide-react'
import Button from '@/components/Button/Button'
import WeatherCard from '../Weather/WeatherCard'

export default function Sidebar() {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', href: '/' },
    { icon: <Calendar size={20} />, label: 'All trips', href: '/alltrips' },
    { icon: <Plane size={20} />, label: 'Travels', href: '#' },
    { icon: <Bed size={20} />, label: 'Rooms', href: '#' },
    { icon: <Car size={20} />, label: 'Transport', href: '#' },
    { icon: <Landmark size={20} />, label: 'Attractions', href: '#' },
  ]

  return (
    <div className="w-72  h-screen bg-white p-6 m-2 rounded-md flex flex-col">
    <Logo />
    <Button className="bg-customBlue h-12 text-white rounded-lg shadow-custom" text="New Trip" />
      <nav className="flex-grow">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </nav>
      <WeatherCard location='rome' />
      <MenuItem className="p-12" icon={<HelpCircle size={20} />} label="Support" href="/support" />
    </div>
  )
}