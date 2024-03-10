import React from 'react'
import { NavLink } from 'react-router-dom'

import { MENU } from '@/consts/menu'

const CLASS_LINK = `
  group block my-20
  relative pl-2
  oveflow-hidden
  before:[counter-increment:counter] before:content-[counter(counter,decimal-leading-zero)]
  before:absolute before:z-[1] before:right-full before:bottom-[115%]
  before:text-brand_tertiary before:text-xs before:font-bold
`

const CLASS_TEXT = `
  overflow-hidden
  content-[""] absolute z-[1] bottom-full left-0
  w-3/4 h-0.5
  bg-brand_secondary
  transition-transform duration-300 ease-in-out

  after:content-[""] after:absolute after:z-[1] after:top-0 after:left-0
  after:w-full after:h-0.5 after:bg-brand_tertiary

  after:transition-transform after:duration-300 after:ease-in-out
  after:group-hover:translate-x-full
`
interface MenuProps {
  onSelectedItem: () => void
}

export function Menu ({ onSelectedItem }: MenuProps) {
  return (
    <div className='[counter-reset:counter]'>
      <h3 className='text-3xl font-black font-main mb-20'>Menu</h3>
      <nav className='ml-8'>
        {MENU.map(({ link, text }) => (
          <NavLink
            key={link}
            to={link}
            className={CLASS_LINK}
            onClick={onSelectedItem}
          >
            <span className='relative pt-1.5 text-xl'>
              <span className={CLASS_TEXT} />
              {text}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
};
