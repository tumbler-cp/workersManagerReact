import { useContext, useEffect, useState } from 'react';
import { Organization } from '../../model/Domain';
import { OrganizationContext } from '../../provider/OrganizationProvider';
import { AuthContext } from '../../provider/AuthProvider';
import NewOrganizationModal from './NewOrganization';
import UpdateOrganizationModal from './UpdateOrganization';
import TextSocket from '../../websocket/TextSocket';
import { AppEvent } from '../../model/App';
import { Role } from '../../model/Auth';

const Table = ({
    data,
    onRowClick,
    onUpdateRowClick,
    user_id,
    user_role,
    setSaveModalBool,
}: {
    data: Organization[];
    onRowClick?: (row: Organization) => void;
    onUpdateRowClick?: (row: Organization) => void;
    user_id: number;
    user_role: Role;
    setSaveModalBool?: any;
}) => {
    return (
        <table className="mx-auto my-10 border-collapse">
            <thead>
                <tr>
                    <th>id</th>
                    <th>zipCode</th>
                    <th>annualTurnover</th>
                    <th>employeesCount</th>
                    <th>fullName</th>
                    <th>rating</th>
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
                        <td>{item.zipCode}</td>
                        <td>{item.annualTurnover}</td>
                        <td>{item.employeesCount}</td>
                        <td>{item.fullName}</td>
                        <td>{item.rating}</td>
                    </tr>
                ))}
                <tr
                    onClick={() => {
                        setSaveModalBool(true);
                    }}
                >
                    <td colSpan={6} className="hover:bg-white hover:text-black">
                        +
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

const Organizations = () => {
    document.title = 'Организации';

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sort, setSort] = useState('id,asc');
    const [ascending, setAscending] = useState(false);
    const [content, setContent] = useState<Organization[]>([]);

    const [newOrganizationModal, setNewOrganizationModal] =
        useState<boolean>(false);
    const [updaOrganizationModal, setUpdOrganizationModal] =
        useState<boolean>(false);
    const [selectedOrganization, setSelectedOrganization] =
        useState<Organization | null>(null);

    const organizationKeys = [
        'id',
        'zipCode',
        'annualTurnover',
        'employeesCount',
        'fullName',
        'rating',
    ];

    const organizationContext = useContext(OrganizationContext);
    const authContext = useContext(AuthContext);

    if (!organizationContext || !authContext) {
        return null;
    }

    const { organizationPage, getPageOrganizations } = organizationContext;
    const { user } = authContext;

    if (!user) {
        return null;
    }

    const [textSocket] = useState<TextSocket>(new TextSocket());

    const onMsg = (message: string) => {
        const event: AppEvent = JSON.parse(message);
        if (event.object == 'Organization') {
            getPageOrganizations(page, size, sort).then(() => {
                setContent(organizationPage);
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
        setContent(organizationPage);
        console.log(organizationPage);
    }, [organizationPage]);

    useEffect(() => {
        if (user) {
            getPageOrganizations(page, size, sort).then(() => {
                setContent(organizationPage);
            });
        }
    }, [page, size, sort, user, ascending]);

    const updateSort = (key?: string) => {
        const k = key ? key : sort.split(',')[0];
        const a = ascending ? 'asc' : 'desc';
        setSort(`${k},${a}`);
    };

    const handleUpdateRowClick = (organization: Organization) => {
        setSelectedOrganization(organization);
        setUpdOrganizationModal(true);
    };

    return (
        <div className="flex flex-col mx-auto my-auto">
            <div className="flex flex-col mx-auto my-auto items-center">
                <h1 className="text-3xl font-bold text-center my-3">
                    Организации
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
                    {organizationKeys.map((key) => (
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
                    setSaveModalBool={setNewOrganizationModal}
                    onUpdateRowClick={handleUpdateRowClick}
                />
                {newOrganizationModal && (
                    <NewOrganizationModal
                        closeBoolSet={setNewOrganizationModal}
                    />
                )}
                {updaOrganizationModal && selectedOrganization && (
                    <UpdateOrganizationModal
                        organization={selectedOrganization}
                        closeBoolSet={setUpdOrganizationModal}
                    />
                )}
            </div>
        </div>
    );
};

export default Organizations;
