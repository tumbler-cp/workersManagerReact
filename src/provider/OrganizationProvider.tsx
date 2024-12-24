import { createContext, useEffect, useState } from 'react';
import { Organization } from '../model/Domain';
import axios from 'axios';
import { NewOrganization } from '../manager/organization/NewOrganization';

interface OrganizationContextInterface {
    organizationPage: Organization[];
    getAllOrganizations: () => Promise<Organization[]>;
    getPageOrganizations: (
        page: number,
        size: number,
        sort: string,
    ) => Promise<void>;
    newOrganization: (organization: NewOrganization) => Promise<void>;
    updateOrganization: (organization: Organization) => Promise<void>;
    deleteOrganization: (id: number) => Promise<void>;
}

export const OrganizationContext = createContext<
    OrganizationContextInterface | undefined
>(undefined);

export const OrganizationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [organizationPage, setOrganizationPage] = useState<Organization[]>(
        [],
    );

    const getAllOrganizations = async () => {
        const response = await axios.get('/organization/all');
        return response.data;
    };

    const getPageOrganizations = async (
        page: number,
        size: number,
        sort: string,
    ) => {
        await axios
            .get(
                `/organization/paged?page=${page}&pageSize=${size}&sort=${sort}`,
            )
            .then((response) => {
                setOrganizationPage(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const newOrganization = async (organization: NewOrganization) => {
        axios.post('/organization/new', organization).then((response) => {
            return response.data;
        });
    };

    const updateOrganization = async (organization: Organization) => {
        axios.put('/organization/update', organization).then((response) => {
            return response.data;
        });
    };

    const deleteOrganization = async (id: number) => {
        axios.delete(`/organization/delete?id=${id}`).then(() => {});
    };

    useEffect(() => {
        (async () => {
            await getPageOrganizations(0, 5, 'id,asc');
        })();
    }, []);

    return (
        <OrganizationContext.Provider
            value={{
                organizationPage,
                getAllOrganizations,
                getPageOrganizations,
                newOrganization,
                updateOrganization,
                deleteOrganization,
            }}
        >
            {children}
        </OrganizationContext.Provider>
    );
};
