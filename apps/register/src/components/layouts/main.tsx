import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export function Main() {
  return (
    <div>
      <header className="flex flex-row justify-between pb-5 mb-5">
        <div className="relative">
          <NavLink to="/">
            <h1 className="text-4xl font-black">
              Madboks
            </h1>
          </NavLink>
        </div>
      </header>

      <React.Suspense>
        <Outlet />
      </React.Suspense>
    </div>
  )
};
