import { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { AiOutlineLoading } from 'react-icons/ai';

const AuthGuard = ({ children }: { children: JSX.Element }) => {
    const authContext = useContext(AuthContext);
    const location = useLocation();

    if (!authContext) {
        return null;
    }

    const { user, upd, loading } = authContext;

    useEffect(() => {
        if (!user && loading) {
            upd();
        }
    }, [user, upd, loading]);

    if (loading) {
        return (
            <div>
                <AiOutlineLoading className="animate-spin text-white" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return children;
};

export default AuthGuard;
