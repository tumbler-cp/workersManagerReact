import { useContext, useEffect, useState } from 'react';
import { Person } from '../../model/Domain';
import { PersonContext } from '../../provider/PersonProvider';
import { AuthContext } from '../../provider/AuthProvider';
import NewPersonModal from './NewPerson';
import UpdatePersonModal from './UpdatePerson';

const Table = ({
    data,
    onRowClick,
    onUpdateRowClick,
    user_id,
    setSaveModalBool,
}: {
    data: Person[];
    onRowClick?: (row: Person) => void;
    onUpdateRowClick?: (row: Person) => void;
    user_id: number;
    setSaveModalBool?: any;
}) => {
    return (
        <table className="mx-auto my-10 border-collapse">
            <thead>
                <tr>
                    <th>id</th>
                    <th>eyeColor</th>
                    <th>hairColor</th>
                    <th>locationId</th>
                    <th>height</th>
                    <th>weight</th>
                    <th>passportID</th>
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
                        <td>{item.eyeColor}</td>
                        <td>{item.hairColor}</td>
                        <td>{item.locationId}</td>
                        <td>{item.height}</td>
                        <td>{item.weight}</td>
                        <td>{item.passportID}</td>
                    </tr>
                ))}
                <tr
                    onClick={() => {
                        setSaveModalBool(true);
                    }}
                >
                    <td colSpan={7} className="hover:bg-white hover:text-black">
                        +
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

const Persons = () => {
    document.title = 'Люди';

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sort, setSort] = useState('id,asc');
    const [ascending, setAscending] = useState(false);
    const [content, setContent] = useState<Person[]>([]);

    const [newPersonModal, setNewPersonModal] = useState<boolean>(false);
    const [updPersonModal, setUpdPersonModal] = useState<boolean>(false);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    const personKeys = [
        'id',
        'eyeColor',
        'hairColor',
        'locationId',
        'height',
        'weight',
        'passportID',
    ];

    const personContext = useContext(PersonContext);
    const authContext = useContext(AuthContext);

    if (!personContext || !authContext) {
        return null;
    }

    const { personPage, getPagePersons } = personContext;
    const { user } = authContext;

    if (!user) {
        return null;
    }

    useEffect(() => {
        setContent(personPage);
        console.log(personPage);
    }, [personPage]);

    useEffect(() => {
        if (user) {
            getPagePersons(page, size, sort).then(() => {
                setContent(personPage);
            });
        }
    }, [page, size, sort, user, ascending]);

    const updateSort = (key?: string) => {
        const k = key ? key : sort.split(',')[0];
        const a = ascending ? 'asc' : 'desc';
        setSort(`${k},${a}`);
    };

    const handleUpdateRowClick = (person: Person) => {
        setSelectedPerson(person);
        setUpdPersonModal(true);
    };

    return (
        <div className="flex flex-col mx-auto my-auto">
            <div className="flex flex-col mx-auto my-auto items-center">
                <h1 className="text-3xl font-bold text-center my-3">Люди</h1>
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
                    {personKeys.map((key) => (
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
                    setSaveModalBool={setNewPersonModal}
                    onUpdateRowClick={handleUpdateRowClick}
                />
                {newPersonModal && (
                    <NewPersonModal closeBoolSet={setNewPersonModal} />
                )}
                {updPersonModal && selectedPerson && (
                    <UpdatePersonModal
                        person={selectedPerson}
                        closeBoolSet={setUpdPersonModal}
                    />
                )}
            </div>
        </div>
    );
};

export default Persons;
