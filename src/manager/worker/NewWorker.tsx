import { FormEvent, useContext, useState } from 'react';
import { WorkerContext } from '../../provider/WorkerProvider';
import { Position, Status } from '../../model/Domain';

export type NewWorker = {
    name: string;
    x: number;
    y: number;
    organizationId: number;
    salary: number;
    rating: number;
    position: Position;
    status: Status;
    personId: number;
    editableByAdmin: boolean;
};

const NewWorkerModal = ({ closeBoolSet }: { closeBoolSet: any }) => {
    const [name, setName] = useState<string>('');
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
    const [organizationId, setOrganizationId] = useState<number>(0);
    const [salary, setSalary] = useState<number>(0);
    const [rating, setRating] = useState<number>(0);
    const [position, setPosition] = useState<Position>(Position.BAKER);
    const [status, setStatus] = useState<Status>(Status.HIRED);
    const [personId, setPersonId] = useState<number>(0);
    const [editableByAdmin, setEditableByAdmin] = useState<boolean>(false);

    const workerContext = useContext(WorkerContext);

    if (!workerContext) {
        return null;
    }

    const { newWorker } = workerContext;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        newWorker({
            name,
            x,
            y,
            organizationId,
            salary,
            rating,
            position,
            status,
            personId,
            editableByAdmin,
        }).then(() => {
            closeBoolSet(false);
        });
    };

    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50">
            <div className="bg-black p-10 mx-auto my-auto border border-gray-500 rounded-lg max-h-screen overflow-y-auto">
                <form className="flex flex-col" action="">
                    <p className="text-xl font-bold">
                        Создать нового работника
                    </p>

                    <label className="mt-2" htmlFor="name">
                        Имя
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        className="authput"
                        type="text"
                    />

                    <label className="mt-2" htmlFor="x">
                        Координата X
                    </label>
                    <input
                        value={x}
                        onChange={(e) => setX(parseInt(e.target.value))}
                        name="x"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="y">
                        Координата Y
                    </label>
                    <input
                        value={y}
                        onChange={(e) => setY(parseInt(e.target.value))}
                        name="y"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="organizationId">
                        ID организации
                    </label>
                    <input
                        value={organizationId}
                        onChange={(e) =>
                            setOrganizationId(parseInt(e.target.value))
                        }
                        name="organizationId"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="salary">
                        Зарплата
                    </label>
                    <input
                        value={salary}
                        onChange={(e) => setSalary(parseInt(e.target.value))}
                        name="salary"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="rating">
                        Рейтинг
                    </label>
                    <input
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        name="rating"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="position">
                        Позиция
                    </label>
                    <select
                        value={position}
                        onChange={(e) =>
                            setPosition(e.target.value as unknown as Position)
                        }
                        name="position"
                        className="authput"
                    >
                        {Object.keys(Position)
                            .filter((key) => isNaN(Number(key)))
                            .map((pos) => (
                                <option
                                    key={pos}
                                    value={
                                        Position[pos as keyof typeof Position]
                                    }
                                >
                                    {pos}
                                </option>
                            ))}
                    </select>

                    <label className="mt-2" htmlFor="status">
                        Статус
                    </label>
                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value as unknown as Status)
                        }
                        name="status"
                        className="authput"
                    >
                        {Object.keys(Status)
                            .filter((key) => isNaN(Number(key)))
                            .map((stat) => (
                                <option
                                    key={stat}
                                    value={Status[stat as keyof typeof Status]}
                                >
                                    {stat}
                                </option>
                            ))}
                    </select>

                    <label className="mt-2" htmlFor="personId">
                        ID человека
                    </label>
                    <input
                        value={personId}
                        onChange={(e) => setPersonId(parseInt(e.target.value))}
                        name="personId"
                        className="authput"
                        type="number"
                    />

                    <label
                        className="mt-2 flex items-center"
                        htmlFor="editableByAdmin"
                    >
                        <span className="mr-3">
                            Редактируемо администратором
                        </span>
                        <div className="relative cursor-pointer">
                            <input
                                checked={editableByAdmin}
                                onChange={(e) =>
                                    setEditableByAdmin(e.target.checked)
                                }
                                name="editableByAdmin"
                                id="editableByAdmin"
                                className="sr-only peer"
                                type="checkbox"
                            />
                            <div className="w-14 h-8 bg-black border rounded-full peer-checked:bg-white-500 peer-checked:bg-gray-400  transition-all"></div>
                            <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform transform peer-checked:translate-x-6"></div>
                        </div>
                    </label>

                    <button
                        className="my-4"
                        onClick={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        Создать
                    </button>
                    <button
                        className="my-4"
                        onClick={() => {
                            closeBoolSet(false);
                        }}
                    >
                        Отмена
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewWorkerModal;
