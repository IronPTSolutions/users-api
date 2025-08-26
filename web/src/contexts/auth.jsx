import { createContext, useContext, useState } from "react";

const LS_USER = 'current-user';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem(LS_USER) ? 
      JSON.parse(localStorage.getItem(LS_USER)) : 
      null
  );

  const login = (user) => {
    localStorage.setItem(LS_USER, JSON.stringify(user));
    setUser(user);
  }

  const logout = () => {
    setUser(null);
    localStorage.clear(LS_USER);
  }

  const value = {
    user,
    login,
    logout
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}