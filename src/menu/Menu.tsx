import { Link, useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Role } from '../model/Auth';

const Menu = () => {
    const location = useLocation();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return null;
    }

    const { user, signout, adminRequest } = authContext;

    if (!user) {
        return null;
    }

    const menuItems = [
        { path: '/', label: 'Главная' },
        { path: '/locations', label: 'Локации' },
        { path: '/persons', label: 'Личности' },
        { path: '/organizations', label: 'Организации' },
        { path: '/workers', label: 'Сотрудники' },
        { path: '/files', label: 'Файлы' },
    ];

    if ((user.role as Role) == Role.ADMIN) {
        menuItems.push({ path: '/admin', label: 'Администрирование' });
    }

    return (
        <nav>
            <ul className="flex flex-row py-5 px-5 border-b border-gray-700">
                {menuItems.map((item) => (
                    <li key={item.path} className="mx-4 my-auto">
                        <Link
                            to={item.path}
                            className={`
                                mx-auto
                                my-auto
                                hover:text-black
                                hover:bg-white
                                hover:scale-105
                                active:scale-110
                                transition-all
                                duration-300
                                hover:duration-300
                                active:duration-300
                                rounded-md
                                p-3 ${location.pathname === item.path ? 'text-white' : 'text-gray-700'}`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
                {user && (
                    <li className="ml-auto flex items-center m-4">
                        <span className="text-white pr-10">
                            {user.username}
                        </span>
                        <button className="px-4 py-1" onClick={signout}>
                            Sign Out
                        </button>
                        {(user.role as Role) != Role.ADMIN ? (
                            <button
                                className="mx-2 px-4 py-1"
                                onClick={adminRequest}
                            >
                                Потребовать права администратора
                            </button>
                        ) : (
                            ''
                        )}
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Menu;
