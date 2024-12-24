import { useContext, useEffect, useState } from 'react';
import { Location } from '../../model/Domain';
import { LocationContext } from '../../provider/LocationProvider';
import { AuthContext } from '../../provider/AuthProvider';

const Table = ({
    data,
    onRowClick,
    user_id,
}: {
    data: Location[];
    onRowClick?: (row: Location) => void;
    user_id: number;
}) => {
    return (
        <table className="mx-auto my-auto">
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
                        onClick={() =>
                            user_id == item.ownerId &&
                            onRowClick &&
                            onRowClick(item)
                        }
                        className={
                            user_id == item.ownerId
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
            </tbody>
        </table>
    );
};

const Locations = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sort, setSort] = useState('id,asc');
    const [ascending, setAscending] = useState(true);
    const [content, setContent] = useState<Location[]>([]);

    const locationKeys = ['id', 'x', 'y', 'name'];

    const locationContext = useContext(LocationContext);
    const authContext = useContext(AuthContext);

    if (!locationContext || !authContext) {
        return null;
    }

    const { locationPage, getPageLocations } = locationContext;
    const { user } = authContext;

    if (!user) {
        return null;
    }

    useEffect(() => {
        if (user) {
            getPageLocations(page, size, sort).then(() => {
                setContent(locationPage);
            });
        }
    }, [page, size, sort, user, getPageLocations]);

    const updateSort = (key?: string) => {
        const k = key ? key : sort.split(',')[0];
        const a = ascending ? 'asc' : 'desc';
        setSort(`${k},${a}`);
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
                <Table data={content} user_id={user.id} />
            </div>
        </div>
    );
};

export default Locations;
