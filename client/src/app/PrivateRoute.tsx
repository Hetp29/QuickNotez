// src/app/components/PrivateRoute.tsx
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../auth/useAuth';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    router.push('/signup');
    return null; // or a loading spinner
  }

  return <>{children}</>;
};

export default PrivateRoute;
