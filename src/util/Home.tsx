import { IconType } from 'react-icons';
import { FaBlackTie, FaBuilding, FaLocationDot, FaUser } from 'react-icons/fa6';
import { Link } from 'react-router';

const Plate = ({
    icon: Icon,
    path,
    message,
}: {
    icon: IconType;
    path: string;
    message: string;
}) => {
    return (
        <Link
            to={path}
            className="flex items-center m-4 px-10 py-5 border rounded-md text-2xl transition-all hover:scale-110"
        >
            <Icon />
            <span className="ml-10">{message}</span>
        </Link>
    );
};

const Home = () => {
    document.title = 'Главная';
    return (
        <div className="flex flex-grow my-auto mx-auto min-w-max min-h-max">
            <div className="flex flex-col text-center mx-auto my-auto">
                <h1 className="text-6xl font-bold my-10">Добро пожаловать!</h1>
                <Plate
                    icon={FaLocationDot}
                    path="/locations"
                    message="Локации"
                />
                <Plate icon={FaUser} path="/persons" message="Люди" />
                <Plate
                    icon={FaBuilding}
                    path="/organizations"
                    message="Организации"
                />
                <Plate icon={FaBlackTie} path="/workers" message="Сотрудники" />
            </div>
        </div>
    );
};

export default Home;
