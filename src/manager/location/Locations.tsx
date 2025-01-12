import { useContext, useEffect, useState } from 'react';
import { AppEvent } from '../../model/App';
import { Location } from '../../model/Domain';
import { LocationContext } from '../../provider/LocationProvider';
import { AuthContext } from '../../provider/AuthProvider';
import NewLocationModal from './NewLocation';
import UpdateLocationModal from './UpdateLocation';
import TextSocket from '../../websocket/TextSocket';
import { Role } from '../../model/Auth';

const Table = ({
    data,
    onRowClick,
    onUpdateRowClick,
    user_id,
    user_role,
    setSaveModalBool,
}: {
    data: Location[];
    onRowClick?: (row: Location) => void;
    onUpdateRowClick?: (row: Location) => void;
    user_id: number;
    user_role: Role;
    setSaveModalBool?: any;
}) => {
    return (
        <table className="mx-auto my-10 border-collapse">
            <thead>
                <tr>
                    <th>id</th>
                    <th>x</th>
                    <th>y</th>
                    <th>name</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr
                        key={item.id}
                        onClick={() => {
                            if (
                                user_id == item.ownerId ||
                                (item.isEditableByAdmin &&
                                    user_role == Role.ADMIN)
                            ) {
                                if (onRowClick) onRowClick(item);
                                if (onUpdateRowClick) onUpdateRowClick(item);
                            }
                        }}
                        className={
                            user_id == item.ownerId ||
                            (item.isEditableByAdmin && user_role == Role.ADMIN)
                                ? 'hover:bg-white text-white hover:text-black'
                                : 'text-gray-500'
                        }
                    >
                        <td>{item.id}</td>
                        <td>{item.x}</td>
                        <td>{item.y}</td>
                        <td>{item.name}</td>
                    </tr>
                ))}
                <tr
                    onClick={() => {
                        setSaveModalBool(true);
                    }}
                >
                    <td colSpan={4} className="hover:bg-white hover:text-black">
                        +
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

const Locations = () => {
    document.title = 'Локации';

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sort, setSort] = useState('id,asc');
    const [ascending, setAscending] = useState(false);
    const [content, setContent] = useState<Location[]>([]);

    const [newLocationModal, setNewLocationModal] = useState<boolean>(false);
    const [updaLocationModal, setUpdLocationModal] = useState<boolean>(false);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(
        null,
    );
    const [file, setFile] = useState<File | null>(null);

    const locationKeys = ['id', 'x', 'y', 'name'];

    const locationContext = useContext(LocationContext);
    const authContext = useContext(AuthContext);

    if (!locationContext || !authContext) {
        return null;
    }

    const { locationPage, getPageLocations, uploadLocationFile } = locationContext;
    const { user } = authContext;

    if (!user) {
        return null;
    }

    const [textSocket] = useState<TextSocket>(new TextSocket());

    const onMsg = (message: string) => {
        const event: AppEvent = JSON.parse(message);
        if (event.object == 'Location') {
            getPageLocations(page, size, sort).then(() => {
                setContent(locationPage);
            });
        }
    };

    useEffect(() => {
        textSocket.connect('ws://localhost:8080/websocket', onMsg);
        return () => {
            textSocket.disconnect();
        };
    }, [textSocket]);

    useEffect(() => {
        setContent(locationPage);
        console.log(locationPage);
    }, [locationPage]);

    useEffect(() => {
        if (user) {
            getPageLocations(page, size, sort).then(() => {
                setContent(locationPage);
            });
        }
    }, [page, size, sort, user, ascending]);

    const updateSort = (key?: string) => {
        const k = key ? key : sort.split(',')[0];
        const a = ascending ? 'asc' : 'desc';
        setSort(`${k},${a}`);
    };

    const handleUpdateRowClick = (location: Location) => {
        setSelectedLocation(location);
        setUpdLocationModal(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            await uploadLocationFile(file);
            setFile(null);
        }
    };

    return (
        <div className="flex flex-col mx-auto my-auto">
            <div className="flex flex-col mx-auto my-auto items-center">
                <h1 className="text-3xl font-bold text-center my-3">Локации</h1>
                <label className="mt-2" htmlFor="page">
                    Страница
                </label>
                <input
                    name="page"
                    className="authput"
                    type="number"
                    value={page + 1}
                    min={1}
                    onChange={(e) => {
                        const newPage = parseInt(e.target.value) - 1;
                        setPage(newPage);
                    }}
                />
                <label className="mt-2" htmlFor="order">
                    Порядок
                </label>
                <button
                    name="order"
                    className="my-4"
                    onClick={() => {
                        const newAscending = !ascending;
                        setAscending(newAscending);
                        updateSort();
                    }}
                >
                    {ascending ? 'По возрастанию' : 'По убыванию'}
                </button>
                <label className="mt-2" htmlFor="sort">
                    Сортировка
                </label>
                <select
                    name="sort"
                    className="authput my-4"
                    onChange={(e) => {
                        const newSort = e.target.value;
                        updateSort(newSort);
                    }}
                >
                    {locationKeys.map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>
                <label className="mt-2" htmlFor="page">
                    Размер страницы
                </label>
                <input
                    className="authput"
                    type="number"
                    value={size}
                    min={1}
                    onChange={(e) => {
                        const newSize = parseInt(e.target.value);
                        setSize(newSize);
                    }}
                />
                <Table
                    data={content}
                    user_id={user.id}
                    user_role={user.role}
                    setSaveModalBool={setNewLocationModal}
                    onUpdateRowClick={handleUpdateRowClick}
                />
                <div className="my-4">
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleUpload} className="ml-2">
                        Upload File
                    </button>
                </div>
                {newLocationModal && (
                    <NewLocationModal closeBoolSet={setNewLocationModal} />
                )}
                {updaLocationModal && selectedLocation && (
                    <UpdateLocationModal
                        location={selectedLocation}
                        closeBoolSet={setUpdLocationModal}
                    />
                )}
            </div>
        </div>
    );
};

export default Locations;
