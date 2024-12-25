import { FormEvent, useContext, useState } from 'react';
import { WorkerContext } from '../../provider/WorkerProvider';
import { Worker, Position, Status } from '../../model/Domain';

const UpdateWorkerModal = ({
    closeBoolSet,
    worker,
}: {
    closeBoolSet: any;
    worker: Worker;
}) => {
    const [obj, setObj] = useState(worker);
    const workerContext = useContext(WorkerContext);

    if (!workerContext) {
        return null;
    }

    const { updateWorker, deleteWorker } = workerContext;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateWorker(obj).then(() => {
            closeBoolSet(false);
        });
    };

    const handleDelete = () => {
        deleteWorker(obj.id).then(() => {
            closeBoolSet(false);
        });
    };

    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50 overflow-auto">
            <div className="bg-black p-10 mx-auto my-auto border border-gray-500 rounded-lg">
                <form className="flex flex-col" action="">
                    <p className="text-xl font-bold">
                        Обновить данные работника
                    </p>

                    <label className="mt-2" htmlFor="name">
                        Имя
                    </label>
                    <input
                        value={obj.name}
                        onChange={(e) =>
                            setObj({ ...obj, name: e.target.value })
                        }
                        name="name"
                        className="authput"
                        type="text"
                    />

                    <label className="mt-2" htmlFor="salary">
                        Зарплата
                    </label>
                    <input
                        value={obj.salary}
                        onChange={(e) =>
                            setObj({
                                ...obj,
                                salary: parseFloat(e.target.value),
                            })
                        }
                        name="salary"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="rating">
                        Рейтинг
                    </label>
                    <input
                        value={obj.rating}
                        onChange={(e) =>
                            setObj({
                                ...obj,
                                rating: parseFloat(e.target.value),
                            })
                        }
                        name="rating"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="position">
                        Должность
                    </label>
                    <select
                        value={obj.position}
                        onChange={(e) =>
                            setObj({
                                ...obj,
                                position: e.target.value as Position,
                            })
                        }
                        name="position"
                        className="authput"
                    >
                        {Object.values(Position).map((position) => (
                            <option key={position} value={position}>
                                {position}
                            </option>
                        ))}
                    </select>

                    <label className="mt-2" htmlFor="status">
                        Статус
                    </label>
                    <select
                        value={obj.status}
                        onChange={(e) =>
                            setObj({
                                ...obj,
                                status: e.target.value as Status,
                            })
                        }
                        name="status"
                        className="authput"
                    >
                        {Object.values(Status).map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>

                    <label className="mt-2" htmlFor="x">
                        Координата X
                    </label>
                    <input
                        value={obj.coordinates.x}
                        onChange={(e) =>
                            setObj({
                                ...obj,
                                coordinates: {
                                    ...obj.coordinates,
                                    x: parseFloat(e.target.value),
                                },
                            })
                        }
                        name="x"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="y">
                        Координата Y
                    </label>
                    <input
                        value={obj.coordinates.y}
                        onChange={(e) =>
                            setObj({
                                ...obj,
                                coordinates: {
                                    ...obj.coordinates,
                                    y: parseFloat(e.target.value),
                                },
                            })
                        }
                        name="y"
                        className="authput"
                        type="number"
                    />

                    <button
                        className="my-4"
                        onClick={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        Обновить
                    </button>
                    <button
                        className="my-4"
                        onClick={() => {
                            closeBoolSet(false);
                        }}
                    >
                        Отмена
                    </button>
                    <button
                        className="my-4 bg-red-500 text-white"
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                    >
                        Удалить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateWorkerModal;
