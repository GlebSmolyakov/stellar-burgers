import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

interface PublicOnlyRouteProps {
  children: JSX.Element;
}

export const PublicOnlyRoute: FC<PublicOnlyRouteProps> = ({ children }) => {
  const { isAuth, authChecked } = useSelector((state) => state.user);

  if (!authChecked) {
    return <Preloader />;
  }

  if (isAuth) {
    return <Navigate to='/' replace />;
  }

  return children;
};
