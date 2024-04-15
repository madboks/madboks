import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export function Dashboard () {
  return (
    <div>
      <h1>Dashboard</h1>
      <br /><br /><br />
      <NavLink to="home">Home</NavLink><br />
      <NavLink to="settings">Settings</NavLink><br />

      <Outlet />
    </div>
  )
}
