import React, { useContext, useState } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { logoutUser } from '../../API/ServerAPI/server.users';
import { appContext } from '../../context/appContext';
import './AsideBar.css'


function AsideBar() {
  // Global State
  const { token, setToken } = useContext(appContext); 
  const history = useHistory();


  const handleLogout = async () => {
    await logoutUser(token);
    localStorage.removeItem('token')
    setToken(null);
  }

  return (
    <aside className='adise-bar'>
      <nav className='aside-nav'>
        <ul className='aside-ul'>
        <NavLink exact activeClassName="active" to='/' >Home Page</NavLink>
        <NavLink exact activeClassName="active" to='/transfer' ><li>Transfer</li></NavLink>
        <NavLink exact activeClassName="active" to='/my-accounts' ><li>My Accounts</li></NavLink>
        <NavLink exact activeClassName="active" to='/deposit' ><li>Deposit</li></NavLink>
        <NavLink exact activeClassName="active" to='/withdraw' ><li>Withdraw</li></NavLink>
        <Link onClick={handleLogout}  to='/' ><li>Logout</li></Link>


        </ul>
      </nav>
    </aside>
  )
}

export default AsideBar