import React from 'react'

export function IconAdd ({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      className={className}
      viewBox='0 0 24 24'
    >
      <circle cx='12' cy='12' r='10' />
      <path d='M12 8v8M8 12h8' />
    </svg>
  )
}
