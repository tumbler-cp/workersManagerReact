import { FormEvent, useContext, useState } from 'react';
import { PersonContext } from '../../provider/PersonProvider';
import { Color } from '../../model/Domain';

export type NewPerson = {
    eyeColor: Color;
    hairColor: Color;
    locationId: number;
    height: number;
    weight: number;
    passportID: string;
    editableByAdmin: boolean;
};

const NewPersonModal = ({ closeBoolSet }: { closeBoolSet: any }) => {
    const [eyeColor, setEyeColor] = useState<Color>(Color.ORANGE);
    const [hairColor, setHairColor] = useState<Color>(Color.ORANGE);
    const [locationId, setLocationId] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [passportID, setPassportID] = useState<string>('');
    const [editableByAdmin, setEditableByAdmin] = useState<boolean>(false);

    const personContext = useContext(PersonContext);

    if (!personContext) {
        return null;
    }

    const { newPerson } = personContext;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        newPerson({
            eyeColor,
            hairColor,
            locationId,
            height,
            weight,
            passportID,
            editableByAdmin,
        }).then(() => {
            closeBoolSet(false);
        });
    };

    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50 overflow-auto">
            <div className="bg-black p-10 mx-auto my-auto border border-gray-500 rounded-lg">
                <form className="flex flex-col" action="">
                    <p className="text-xl font-bold">Создать нового человека</p>

                    <label className="mt-2" htmlFor="eyeColor">
                        Цвет глаз
                    </label>
                    <select
                        value={eyeColor}
                        onChange={(e) =>
                            setEyeColor(e.target.value as unknown as Color)
                        }
                        name="eyeColor"
                        className="authput"
                    >
                        {Object.keys(Color)
                            .filter((key) => isNaN(Number(key)))
                            .map((color) => (
                                <option
                                    key={color}
                                    value={Color[color as keyof typeof Color]}
                                >
                                    {color}
                                </option>
                            ))}
                    </select>

                    <label className="mt-2" htmlFor="hairColor">
                        Цвет волос
                    </label>
                    <select
                        value={hairColor}
                        onChange={(e) =>
                            setHairColor(e.target.value as unknown as Color)
                        }
                        name="hairColor"
                        className="authput"
                    >
                        {Object.keys(Color)
                            .filter((key) => isNaN(Number(key)))
                            .map((color) => (
                                <option
                                    key={color}
                                    value={Color[color as keyof typeof Color]}
                                >
                                    {color}
                                </option>
                            ))}
                    </select>

                    <label className="mt-2" htmlFor="locationId">
                        ID локации
                    </label>
                    <input
                        value={locationId}
                        onChange={(e) =>
                            setLocationId(parseInt(e.target.value))
                        }
                        name="locationId"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="height">
                        Рост
                    </label>
                    <input
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value))}
                        name="height"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="weight">
                        Вес
                    </label>
                    <input
                        value={weight}
                        onChange={(e) => setWeight(parseInt(e.target.value))}
                        name="weight"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="passportID">
                        Паспорт ID
                    </label>
                    <input
                        value={passportID}
                        onChange={(e) => setPassportID(e.target.value)}
                        name="passportID"
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

export default NewPersonModal;
