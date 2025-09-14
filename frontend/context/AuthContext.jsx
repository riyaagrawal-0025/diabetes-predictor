import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setUser]= useState(null);
    useEffect(()=>{
        const token= localStorage.getItem('token');
        if(token){
            fetchUser(token);
    } else {
      setLoading(false);
    }
    },[]);

    const fetchUser = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        logout();
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

    return(
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}