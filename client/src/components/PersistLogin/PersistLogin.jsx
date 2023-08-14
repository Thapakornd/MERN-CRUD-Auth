import React from 'react'
import { useState, useEffect } from 'react'
import useRefreshToken from '../../hooks/useRefreshToken'
import useAuth from '../../hooks/useAuth'
import { Outlet } from 'react-router-dom'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  
  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const response = await refresh();
        console.log(response);
      } catch (error) {
        console.error.error;
      }
      finally{
        isMounted && setIsLoading(false);
      }
    }

    console.log(!auth?.accessToken);
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      {!persist
        ? <Outlet />
        : isLoading
          ? <p>Loading...</p>
          : <Outlet />
      }
    </>
  )
}

export default PersistLogin