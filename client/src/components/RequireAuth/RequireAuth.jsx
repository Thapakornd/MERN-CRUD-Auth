import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({...allowedRoles}) => {
  const { auth } = useAuth();
  const location = useLocation();
  
  return (
    auth?.roles?.find(role => {
      console.log(role)
      console.log(allowedRoles);
      const arr = [allowedRoles];
      arr.includes(role); 
    })
      ? <Outlet />
      : auth?.user
        ? <Navigate to="/unauthorized" state={{ from: location}} replace />
        : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth