import { useContext } from 'react';
import AuthContext from '../contexts/auth-provider-comtext';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
