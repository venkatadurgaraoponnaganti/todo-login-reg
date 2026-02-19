import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../services/AuthService'

const HeaderComponent = () => {

  const isAuth = isUserLoggedIn()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')   // becomes /api/login automatically
  }

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        
        {/* Brand */}
        <div>
          <NavLink to="/" className="navbar-brand">
            Todo Management Application
          </NavLink>
        </div>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            {isAuth && (
              <li className="nav-item">
                <NavLink to="/todos" className="nav-link">
                  Todos
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <ul className="navbar-nav">
          {!isAuth && (
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </li>
          )}

          {!isAuth && (
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
          )}

          {isAuth && (
            <li className="nav-item">
              <NavLink
                to="/login"
                className="nav-link"
                onClick={handleLogout}
              >
                Logout
              </NavLink>
            </li>
          )}
        </ul>

      </nav>
    </header>
  )
}

export default HeaderComponent
