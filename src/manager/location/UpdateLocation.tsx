import { FormEvent, useContext, useState } from 'react';
import { LocationContext } from '../../provider/LocationProvider';
import { Location } from '../../model/Domain';

const UpdateLocationModal = ({
    closeBoolSet,
    location,
}: {
    closeBoolSet: any;
    location: Location;
}) => {
    const [obj, setObj] = useState(location);
    const locationContext = useContext(LocationContext);

    if (!locationContext) {
        return null;
    }

    const { updateLocation } = locationContext;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateLocation(obj).then(() => {
            closeBoolSet(false);
        });
    };

    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50">
            <div className="bg-black p-10 mx-auto my-auto border border-gray-500 rounded-lg">
                <form className="flex flex-col" action="">
                    <p className="text-xl font-bold">Обновить локацию</p>

                    <label className="mt-2" htmlFor="x">
                        X
                    </label>
                    <input
                        value={obj.x}
                        onChange={(e) =>
                            setObj({ ...obj, x: parseInt(e.target.value) })
                        }
                        name="x"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="y">
                        Y
                    </label>
                    <input
                        value={obj.y}
                        onChange={(e) =>
                            setObj({ ...obj, y: parseInt(e.target.value) })
                        }
                        name="y"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="name">
                        Название
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

                    <label
                        className="mt-2 flex items-center"
                        htmlFor="editableByAdmin"
                    ></label>

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
                </form>
            </div>
        </div>
    );
};

export default UpdateLocationModal;
