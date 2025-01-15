import { createContext, useEffect, useState } from 'react';
import { Person } from '../model/Domain';
import axios from 'axios';
import { NewPerson } from '../manager/person/NewPerson';

interface PersonContextInterface {
    personPage: Person[];
    getAllPersons: () => Promise<Person[]>;
    getPagePersons: (page: number, size: number, sort: string) => Promise<void>;
    newPerson: (person: NewPerson) => Promise<void>;
    updatePerson: (person: Person) => Promise<void>;
    deletePerson: (id: number) => Promise<void>;
    uploadPersonFile: (file: File) => Promise<void>;
}

export const PersonContext = createContext<PersonContextInterface | undefined>(
    undefined,
);

export const PersonProvider = ({ children }: { children: React.ReactNode }) => {
    const [personPage, setPersonPage] = useState<Person[]>([]);

    const getAllPersons = async () => {
        const response = await axios.get('/person/all');
        return response.data;
    };

    const getPagePersons = async (page: number, size: number, sort: string) => {
        await axios
            .get(`/person/paged?page=${page}&pageSize=${size}&sort=${sort}`)
            .then((response) => {
                setPersonPage(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const newPerson = async (person: NewPerson) => {
        axios.post('/person/new', person).then((response) => {
            return response.data;
        });
    };

    const updatePerson = async (person: Person) => {
        axios.put('/person/update', person).then((response) => {
            return response.data;
        });
    };

    const deletePerson = async (id: number) => {
        axios.delete(`/person/delete?id=${id}`).then(() => {});
    };

    const uploadPersonFile = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
    
        await axios.post('/person/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    useEffect(() => {
        (async () => {
            await getPagePersons(0, 5, 'id,asc');
        })();
    }, []);

    return (
        <PersonContext.Provider
            value={{
                personPage,
                getAllPersons,
                getPagePersons,
                newPerson,
                updatePerson,
                deletePerson,
                uploadPersonFile
            }}
        >
            {children}
        </PersonContext.Provider>
    );
};
