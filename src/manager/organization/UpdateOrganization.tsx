import { FormEvent, useContext, useState } from 'react';
import { OrganizationContext } from '../../provider/OrganizationProvider';
import { Organization } from '../../model/Domain';

const UpdateOrganizationModal = ({
    closeBoolSet,
    organization,
}: {
    closeBoolSet: any;
    organization: Organization;
}) => {
    const [obj, setObj] = useState(organization);
    const organizationContext = useContext(OrganizationContext);

    if (!organizationContext) {
        return null;
    }

    const { updateOrganization, deleteOrganization } = organizationContext;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateOrganization(obj).then(() => {
            closeBoolSet(false);
        });
    };

    const handleDelete = () => {
        deleteOrganization(obj.id).then(() => {
            closeBoolSet(false);
        });
    };

    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50">
            <div className="bg-black p-10 mx-auto my-auto border border-gray-500 rounded-lg">
                <form className="flex flex-col" action="">
                    <p className="text-xl font-bold">Обновить организацию</p>

                    <label className="mt-2" htmlFor="zipCode">
                        Почтовый индекс
                    </label>
                    <input
                        value={obj.zipCode}
                        onChange={(e) =>
                            setObj({ ...obj, zipCode: e.target.value })
                        }
                        name="zipCode"
                        className="authput"
                        type="text"
                    />

                    <label className="mt-2" htmlFor="annualTurnover">
                        Годовой оборот
                    </label>
                    <input
                        value={obj.annualTurnover}
                        onChange={(e) =>
                            setObj({
                                ...obj,
                                annualTurnover: parseFloat(e.target.value),
                            })
                        }
                        name="annualTurnover"
                        className="authput"
                        type="number"
                    />

                    <label className="mt-2" htmlFor="fullName">
                        Полное название
                    </label>
                    <input
                        value={obj.fullName}
                        onChange={(e) =>
                            setObj({ ...obj, fullName: e.target.value })
                        }
                        name="fullName"
                        className="authput"
                        type="text"
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

export default UpdateOrganizationModal;
