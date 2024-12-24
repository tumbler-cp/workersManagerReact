import { useContext, useEffect, useState } from 'react';
import { Worker } from '../../model/Domain';
import { WorkerContext } from '../../provider/WorkerProvider';
import { AuthContext } from '../../provider/AuthProvider';
import NewWorkerModal from './NewWorker';
import UpdateWorkerModal from './UpdateWorker';

const Table = ({
    data,
    onRowClick,
    onUpdateRowClick,
    user_id,
    setSaveModalBool,
}: {
    data: Worker[];
    onRowClick?: (row: Worker) => void;
    onUpdateRowClick?: (row: Worker) => void;
    user_id: number;
    setSaveModalBool?: any;
}) => {
    return (
        <table className="mx-auto my-10 border-collapse">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>coordinates</th>
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
                        onClick={() => {
                            if (user_id == item.ownerId) {
                                if (onRowClick) onRowClick(item);
                                if (onUpdateRowClick) onUpdateRowClick(item);
                            }
                        }}
                        className={
                            user_id == item.ownerId
                                ? 'hover:bg-white text-white hover:text-black'
                                : 'text-gray-500'
                        }
                    >
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{`(${item.coordinates.x}, ${item.coordinates.y})`}</td>
                        <td>{item.creationDate}</td>
                        <td>{item.organizationId}</td>
                        <td>{item.salary}</td>
                        <td>{item.rating}</td>
                        <td>{item.position}</td>
                        <td>{item.status}</td>
                        <td>{item.personId}</td>
                    </tr>
                ))}
                <tr
                    onClick={() => {
                        setSaveModalBool(true);
                    }}
                >
                    <td
                        colSpan={10}
                        className="hover:bg-white hover:text-black"
                    >
                        +
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

const Workers = () => {
    document.title = 'Работники';

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sort, setSort] = useState('id,asc');
    const [ascending, setAscending] = useState(false);
    const [content, setContent] = useState<Worker[]>([]);

    const [newWorkerModal, setNewWorkerModal] = useState<boolean>(false);
    const [updWorkerModal, setUpdWorkerModal] = useState<boolean>(false);
    const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

    const workerKeys = [
        'id',
        'name',
        'coordinates',
        'creationDate',
        'organizationId',
        'salary',
        'rating',
        'position',
        'status',
        'personId',
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
        setContent(workerPage);
        console.log(workerPage);
    }, [workerPage]);

    useEffect(() => {
        if (user) {
            getPageWorkers(page, size, sort).then(() => {
                setContent(workerPage);
            });
        }
    }, [page, size, sort, user, ascending]);

    const updateSort = (key?: string) => {
        const k = key ? key : sort.split(',')[0];
        const a = ascending ? 'asc' : 'desc';
        setSort(`${k},${a}`);
    };

    const handleUpdateRowClick = (worker: Worker) => {
        setSelectedWorker(worker);
        setUpdWorkerModal(true);
    };

    return (
        <div className="flex flex-col mx-auto my-auto">
            <div className="flex flex-col mx-auto my-auto items-center">
                <h1 className="text-3xl font-bold text-center my-3">
                    Работники
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
                <Table
                    data={content}
                    user_id={user.id}
                    setSaveModalBool={setNewWorkerModal}
                    onUpdateRowClick={handleUpdateRowClick}
                />
                {newWorkerModal && (
                    <NewWorkerModal closeBoolSet={setNewWorkerModal} />
                )}
                {updWorkerModal && selectedWorker && (
                    <UpdateWorkerModal
                        worker={selectedWorker}
                        closeBoolSet={setUpdWorkerModal}
                    />
                )}
            </div>
        </div>
    );
};

export default Workers;
