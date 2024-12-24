import { FormEvent, useContext, useState } from 'react';
import { OrganizationContext } from '../../provider/OrganizationProvider';

export type NewOrganization = {
    zipCode: string;
    annualTurnover: number;
    employeesCount: number;
    fullName: string;
    rating: number;
    editableByAdmin: boolean;
};

const NewOrganizationModal = ({ closeBoolSet }: { closeBoolSet: any }) => {
    const [zipCode, setZipCode] = useState<string>('');
    const [annualTurnover, setAnnualTurnover] = useState<number>(0);
    const [employeesCount, setEmployeesCount] = useState<number>(0);
    const [fullName, setFullName] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [editableByAdmin, setEditableByAdmin] = useState<boolean>(false);

    const organizationContext = useContext(OrganizationContext);

    if (!organizationContext) {
        return null;
    }

    const { newOrganization } = organizationContext;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        newOrganization({
            zipCode,
            annualTurnover,
            employeesCount,
            fullName,
            rating,
            editableByAdmin,
        }).then(() => {
            closeBoolSet(false);
        });
    };

    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50">
            <div className="bg-black p-10 mx-auto my-auto border border-gray-500 rounded-lg">
                <form className="flex flex-col" action="">
                    <p className="text-xl font-bold">
                        Создать новую организацию
                    </p>

                    <label className="mt-2" htmlFor="zipCode">
                        Почтовый индекс
                    </label>
                    <input
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        name="zipCode"
                        className="authput"
                        type="text"
                    />

                    <label className="mt-2" htmlFor="annualTurnover">
                        Годовой оборот
                    </label>
                    <input
                        value={annualTurnover}
                        onChange={(e) =>
                            setAnnualTurnover(parseFloat(e.target.value))
                        }
                        name="annualTurnover"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="employeesCount">
                        Количество сотрудников
                    </label>
                    <input
                        value={employeesCount}
                        onChange={(e) =>
                            setEmployeesCount(parseInt(e.target.value))
                        }
                        name="employeesCount"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="fullName">
                        Полное название
                    </label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        name="fullName"
                        className="authput"
                        type="text"
                    />

                    <label className="mt-2" htmlFor="rating">
                        Рейтинг
                    </label>
                    <input
                        value={rating}
                        onChange={(e) => setRating(parseFloat(e.target.value))}
                        name="rating"
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

export default NewOrganizationModal;
