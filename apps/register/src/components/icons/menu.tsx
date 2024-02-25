import React from 'react'

export function IconMenu ({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5'
      />
    </svg>
  )
}
