import { Link, useLocation } from 'react-router';

const Menu = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/', label: 'Главная' },
        { path: '/locations', label: 'Локации' },
        { path: '/persons', label: 'Личности' },
        { path: '/organizations', label: 'Организации' },
        { path: '/workers', label: 'Сотрудники' },
    ];

    return (
        <nav>
            <ul className="flex flex-row py-5 px-5 border-b border-gray-700">
                {menuItems.map((item) => (
                    <li key={item.path} className="m-4">
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
            </ul>
        </nav>
    );
};

export default Menu;
