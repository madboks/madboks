import React from 'react'

export function Subtitle ({ title = '' }: { title?: string }) {
  return (
    <div className='relative'>
      <h2 className='text-sm font-semibold tracking-widest font-main uppercase'>{title}</h2>
    </div>
  )
};
