import { useAuth0 } from '@auth0/auth0-react';
import { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
  exact: boolean;
  path: string;
}

const PrivateRoute = ({ children, exact, path }: PrivateRouteProps) => {
  const { user } = useAuth0();
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (!user ? <Redirect to="/" /> : children)}
    />
  );
};

export default PrivateRoute;
