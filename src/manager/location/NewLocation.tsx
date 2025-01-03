import { FormEvent, useContext, useState } from 'react';
import { LocationContext } from '../../provider/LocationProvider';

export type NewLocation = {
    x: number;
    y: number;
    name: string;
    editableByAdmin: boolean;
};

const NewLocationModal = ({ closeBoolSet }: { closeBoolSet: any }) => {
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [editableByAdmin, setEditableByAdmin] = useState<boolean>(false);

    const locationContext = useContext(LocationContext);

    if (!locationContext) {
        return null;
    }

    const { newLocation } = locationContext;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        newLocation({
            x,
            y,
            name,
            editableByAdmin,
        }).then(() => {
            closeBoolSet(false);
        });
    };

    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50">
            <div className="bg-black p-10 mx-auto my-auto border border-gray-500 rounded-lg">
                <form className="flex flex-col" action="">
                    <p className="text-xl font-bold">Создать новую локацию</p>

                    <label className="mt-2" htmlFor="x">
                        X
                    </label>
                    <input
                        value={x}
                        onChange={(e) => setX(parseInt(e.target.value))}
                        name="x"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="y">
                        Y
                    </label>
                    <input
                        value={y}
                        onChange={(e) => setY(parseInt(e.target.value))}
                        name="y"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="name">
                        Название
                    </label>
                    <input
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        name="name"
                        className="authput"
                        type="text"
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

export default NewLocationModal;
