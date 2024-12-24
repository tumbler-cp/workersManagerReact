import { FormEvent, useContext, useState } from 'react';
import { PersonContext } from '../../provider/PersonProvider';
import { Person, Color } from '../../model/Domain';

const UpdatePersonModal = ({
    closeBoolSet,
    person,
}: {
    closeBoolSet: any;
    person: Person;
}) => {
    const [obj, setObj] = useState(person);
    const personContext = useContext(PersonContext);

    if (!personContext) {
        return null;
    }

    const { updatePerson } = personContext;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updatePerson(obj).then(() => {
            closeBoolSet(false);
        });
    };

    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50">
            <div className="bg-black p-10 mx-auto my-auto border border-gray-500 rounded-lg">
                <form className="flex flex-col" action="">
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
                                eyeColor: parseInt(e.target.value),
                            })
                        }
                        name="eyeColor"
                        className="authput"
                    >
                        {Object.keys(Color)
                            .filter((key) => isNaN(Number(key)))
                            .map((color, index) => (
                                <option key={index} value={index}>
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
                                hairColor: parseInt(e.target.value),
                            })
                        }
                        name="hairColor"
                        className="authput"
                    >
                        {Object.keys(Color)
                            .filter((key) => isNaN(Number(key)))
                            .map((color, index) => (
                                <option key={index} value={index}>
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
                                passportID: parseInt(e.target.value),
                            })
                        }
                        name="passportID"
                        className="authput"
                        type="text"
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
                </form>
            </div>
        </div>
    );
};

export default UpdatePersonModal;
