import React from "react";
import useAuth from "./useAuth";
import axios from "../API/axios";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      const response = await axios.get("/logout", {
        withCredentials: true,
      });
      setAuth({});
      console.log(response);
    } catch (error) {
      console.error.error;
    }
  };

  return logout;
};

export default useLogout;
