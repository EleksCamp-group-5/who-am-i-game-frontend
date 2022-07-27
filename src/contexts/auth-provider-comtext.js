import { createContext, useState } from 'react';

const AuthContext = createContext({
  token: '',
  username: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  changeUserName: (username) => {},
});

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const [username, setUserName] = useState('GreenDean');
  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };
  const changeUserNameHandler = (username) => {
    setUserName(username);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    username: username,
    login: loginHandler,
    logout: logoutHandler,
    changeUserName: changeUserNameHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
