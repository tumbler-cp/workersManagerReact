import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { FileLog } from '../model/Domain';
import { OrganizationContext } from './OrganizationProvider';
import { LocationContext } from './LocationProvider';
import { PersonContext } from './PersonProvider';
import { WorkerContext } from './WorkerProvider';

interface FileContextInterface {
    fileList: FileLog[];
    getAllFiles: () => Promise<void>;
    downloadFile: (name: string) => Promise<void>;
}

export const FileContext = createContext<FileContextInterface | undefined>(
    undefined,
);

export const FileProvider = ({ children }: { children: React.ReactNode }) => {
    const [fileList, setFileList] = useState<FileLog[]>([]);

    const locationContext = useContext(LocationContext);
    const organizationContext = useContext(OrganizationContext);
    const personContext = useContext(PersonContext);
    const workerContext = useContext(WorkerContext);

    if (
        !locationContext ||
        !organizationContext ||
        !personContext ||
        !workerContext
    ) {
        console.error(
            'FileProvider must be a child of LocationProvider, OrganizationProvider, PersonProvider, and WorkerProvider',
        );
        return null;
    }

    const { locationPage } = locationContext;
    const { organizationPage } = organizationContext;
    const { personPage } = personContext;
    const { workerPage } = workerContext;

    const getAllFiles = async () => {
        await axios.get('/file/logs').then((response) => {
            setFileList(response.data);
            console.log(response.data);
        });
    };

    const downloadFile = async (name: string) => {
        try {
            const response = await axios.get(`/file/download/${name}`, {
                responseType: 'blob',
            });

            const blob = response.data;
            const link = document.createElement('a');

            const fileName = name;

            link.href = URL.createObjectURL(blob);
            link.download = fileName;

            link.click();
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading the file', error);
        }
    };

    useEffect(() => {
        (async () => {
            await getAllFiles();
        })();
    }, [locationPage, organizationPage, personPage, workerPage]);

    return (
        <FileContext.Provider value={{ fileList, getAllFiles, downloadFile }}>
            {children}
        </FileContext.Provider>
    );
};
