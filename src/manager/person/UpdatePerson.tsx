import { FormEvent, useContext, useState } from 'react';
import { PersonContext } from '../../provider/PersonProvider';
import { Person, Color } from '../../model/Domain';

const UpdatePersonModal = ({
    closeBoolSet,
    person,
}: {
    closeBoolSet: (value: boolean) => void;
    person: Person;
}) => {
    const [obj, setObj] = useState(person);
    const personContext = useContext(PersonContext);

    if (!personContext) {
        return null;
    }

    const { updatePerson, deletePerson } = personContext;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await updatePerson(obj);
            closeBoolSet(false);
        } catch (error) {
            console.error('Failed to update person:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deletePerson(obj.id);
            closeBoolSet(false);
        } catch (error) {
            console.error('Failed to delete person:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50">
            <div className="bg-black p-10 mx-auto my-auto border border-gray-500 rounded-lg">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <p className="text-xl font-bold">
                        Обновить данные человека
                    </p>

                    <label className="mt-2" htmlFor="eyeColor">
                        Цвет глаз
                    </label>
                    <select
                        value={obj.eyeColor}
                        onChange={(e) =>
                            setObj({
                                ...obj,
                                eyeColor: e.target.value as Color,
                            })
                        }
                        name="eyeColor"
                        className="authput"
                    >
                        {Object.values(Color).map((color, index) => (
                            <option key={index} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>

                    <label className="mt-2" htmlFor="hairColor">
                        Цвет волос
                    </label>
                    <select
                        value={obj.hairColor}
                        onChange={(e) =>
                            setObj({
                                ...obj,
                                hairColor: e.target.value as Color,
                            })
                        }
                        name="hairColor"
                        className="authput"
                    >
                        {Object.values(Color).map((color, index) => (
                            <option key={index} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>

                    <label className="mt-2" htmlFor="height">
                        Рост
                    </label>
                    <input
                        value={obj.height}
                        onChange={(e) =>
                            setObj({ ...obj, height: parseInt(e.target.value) })
                        }
                        name="height"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="weight">
                        Вес
                    </label>
                    <input
                        value={obj.weight}
                        onChange={(e) =>
                            setObj({ ...obj, weight: parseInt(e.target.value) })
                        }
                        name="weight"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="passportID">
                        Паспорт ID
                    </label>
                    <input
                        value={obj.passportID}
                        onChange={(e) =>
                            setObj({
                                ...obj,
                                passportID: e.target.value,
                            })
                        }
                        name="passportID"
                        className="authput"
                        type="text"
                    />

                    <button className="my-4" type="submit">
                        Обновить
                    </button>
                    <button
                        className="my-4"
                        type="button"
                        onClick={() => {
                            closeBoolSet(false);
                        }}
                    >
                        Отмена
                    </button>
                    <button
                        className="my-4 bg-red-500 text-white"
                        type="button"
                        onClick={handleDelete}
                    >
                        Удалить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePersonModal;
