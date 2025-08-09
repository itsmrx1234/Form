import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false); // use boolean false, not string 'false'
  const [username, setUsername] = useState('');

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};
