import { useContext, useEffect } from 'react';
import Menu from './menu/Menu';
import { Routes, Route } from 'react-router';
import Locations from './manager/location/Locations';
import Organizations from './manager/organization/Organizations';
import Persons from './manager/person/Persons';
import Workers from './manager/worker/Workers';
import Home from './util/Home';
import { AuthContext } from './provider/AuthProvider';
import { Role } from './model/Auth';
import { AdminProvider } from './provider/AdminProvider';
import Admin from './admin/Admin';
import Files from './manager/file/Files';

const App = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return null;
    }

    const { user } = authContext;

    if (!user) {
        return null;
    }

    useEffect(() => {
        document.title = 'Loading...';
        console.log(user.role === Role.ADMIN);
        console.log(user);
    }, []);

    return (
        <div className="min-h-screen min-w-max bg-black flex flex-col text-white">
            <Menu />
            <div className="flex-grow flex">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/locations" element={<Locations />} />
                    <Route path="/persons" element={<Persons />} />
                    <Route path="/organizations" element={<Organizations />} />
                    <Route path="/workers" element={<Workers />} />
                    <Route path="/files" element={<Files />} />
                    {(user.role as Role) == Role.ADMIN && (
                        <Route
                            path="/admin"
                            element={
                                <AdminProvider>
                                    <Admin />
                                </AdminProvider>
                            }
                        />
                    )}
                </Routes>
            </div>
        </div>
    );
};

export default App;
