import { useContext, useEffect, useState } from 'react';
import { Worker } from '../../model/Domain';
import { AuthContext } from '../../provider/AuthProvider';
import { WorkerContext } from '../../provider/WorkerProvider';

const Table = ({
    data,
    onRowClick,
    user_id,
}: {
    data: Worker[];
    onRowClick?: (row: Worker) => void;
    user_id: number;
}) => {
    return (
        <table className="mx-auto my-auto">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>x</th>
                    <th>y</th>
                    <th>creationDate</th>
                    <th>organizationId</th>
                    <th>salary</th>
                    <th>rating</th>
                    <th>position</th>
                    <th>status</th>
                    <th>personId</th>
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
                        <td>{item.name}</td>
                        <td>{item.coordinates.x}</td>
                        <td>{item.coordinates.y}</td>
                        <td>{item.creationDate}</td>
                        <td>{item.organizationId}</td>
                        <td>{item.salary}</td>
                        <td>{item.rating}</td>
                        <td>{item.position}</td>
                        <td>{item.status}</td>
                        <td>{item.personId}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const Workers = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sort, setSort] = useState('id,asc');
    const [ascending, setAscending] = useState(true);
    const [content, setContent] = useState<Worker[]>([]);

    const workerKeys = [
        'id',
        'eyeColor',
        'hairColor',
        'locationId',
        'height',
        'weight',
        'passportID',
    ];

    const workerContext = useContext(WorkerContext);
    const authContext = useContext(AuthContext);

    if (!workerContext || !authContext) {
        return null;
    }

    const { workerPage, getPageWorkers } = workerContext;
    const { user } = authContext;

    if (!user) {
        return null;
    }

    useEffect(() => {
        if (user) {
            getPageWorkers(page, size, sort).then(() => {
                setContent(workerPage);
            });
        }
    }, [page, size, sort, user, getPageWorkers]);

    const updateSort = (key?: string) => {
        const k = key ? key : sort.split(',')[0];
        const a = ascending ? 'asc' : 'desc';
        setSort(`${k},${a}`);
    };

    return (
        <div className="flex flex-col mx-auto my-auto">
            <div className="flex flex-col mx-auto my-auto items-center">
                <h1 className="text-3xl font-bold text-center my-3">
                    Сотрудники
                </h1>
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
                    {workerKeys.map((key) => (
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

export default Workers;
