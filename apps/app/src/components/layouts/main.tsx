import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { clsx } from 'clsx'

import { Button } from '@/components/ui/button'
import { IconMenu } from '@/components/icons/menu'
import { IconClose } from '@/components/icons/close'
import { Menu } from '@/components/ui/menu'

export function Main () {
  const [isMenuOpen, setMenuOpen] = React.useState(false)

  return (
    <div className='relative min-h-dvh max-h-dvh overflow-hidden flex flex-col'>
      <div className={clsx(
        'container m-auto px-8 py-10 flex flex-col grow transition-transform duration-300 ease-in-out',
        {
          '-translate-x-3/4 overflow-hidden': isMenuOpen,
          'overflow-y-auto': !isMenuOpen,
          'after:absolute after:z-[1] after:content-[""] after:bg-transparent after:top-0 after:left-0 after:w-full after:h-full': isMenuOpen
        }
      )}
      >
        <header className='flex flex-row justify-between pb-5 mb-5'>
          <div className='relative'>
            <NavLink to='/'>
              <h1 className='
                text-4xl font-black font-main
                after:absolute after:z-[1] after:content-[""]
                after:-bottom-2 after:left-1/4
                after:w-[120%] after:h-1
                after:rounded-full after:bg-brand_secondary
              '
              >Madboks
              </h1>
            </NavLink>
          </div>
          <Button
            variant='link'
            size='icon'
            className='z-30'
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen
              ? <IconClose
                  className='h-6 w-6 rotate-180 text-black'
                />
              : <IconMenu
                  className='h-6 w-6 rotate-180 text-black'
                />}
          </Button>
        </header>

        <React.Suspense>
          <Outlet />
        </React.Suspense>

      </div>
      <aside
        className={clsx(
          'fixed top-0 right-0 z-10',
          'w-3/4 h-full px-8 py-10',
          'bg-brand_primary border-l-2 border-brand_darker',
          'transition-transform duration-300 ease-in-out',
          {
            'translate-x-full': !isMenuOpen,
            'translate-x-0 shadow-[0_0.875rem_2rem_rgb(0,0,0,0.2)]': isMenuOpen
          }
        )}
      >
        <Menu onSelectedItem={() => setMenuOpen(false)} />
      </aside>
    </div>
  )
};
