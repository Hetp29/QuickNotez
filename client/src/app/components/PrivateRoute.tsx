import { ReactNode } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../auth/useAuth";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    if(loading) return <>Loading...</>

    if(!user) {
        router.push('/login');
        return null; 
    }

    return <>{children}</>
};

export default PrivateRoute;