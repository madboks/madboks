import React from 'react'

export function IconClose ({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      className={className}
    >
      <path d='M18 6 6 18M6 6l12 12' />
    </svg>
  )
}
