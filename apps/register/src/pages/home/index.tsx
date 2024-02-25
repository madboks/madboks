import React from 'react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { MENU } from '@/consts/menu'

export function Component () {
  return (
    <ul className="space-y-8 mt-8">
      {MENU.map(item => (
        <li key={item.link}>
          <Button asChild className='px-8 py-6 w-full flex flex-row'>
            <NavLink to={item.link}>
              <item.icon className='h-6 w-6 block mr-2' />
              <p className='grow'>{item.text}</p>
              <small className='ml-2 text-foreground'>{item.description}</small>
            </NavLink>
          </Button>
        </li>
      ))}
    </ul>
  )
};

Component.displayName = 'Home'
