import { useEffect } from 'react';
import Menu from './menu/Menu';
import { Routes, Route } from 'react-router';
import Locations from './manager/location/Locations';
import Organizations from './manager/organization/Organizations';
import Persons from './manager/person/Persons';
import Workers from './manager/worker/Workers';
import Home from './util/Home';

const App = () => {
    useEffect(() => {
        document.title = 'Loading...';
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
                </Routes>
            </div>
        </div>
    );
};

export default App;
