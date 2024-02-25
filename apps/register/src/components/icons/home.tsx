import React from 'react'

export function IconHome ({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      viewBox='0 0 24 24'
      className={className}
    >
      <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
      <path d='M9 22V12h6v10' />
    </svg>
  )
}
