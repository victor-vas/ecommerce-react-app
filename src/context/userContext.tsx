/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LogoutOptions,
  RedirectLoginOptions,
  useAuth0,
} from '@auth0/auth0-react';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface UserProviderProps {
  children: ReactNode;
}

interface IUserContext {
  loginWithRedirect: (
    options?: RedirectLoginOptions | undefined,
  ) => Promise<void>;
  logout: (options?: LogoutOptions | undefined) => void;
  myUser: any | null;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: UserProviderProps) => {
  const { loginWithRedirect, logout, user } = useAuth0();
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    setMyUser(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
