import { createContext, useEffect, useState } from 'react';
import { Worker } from '../model/Domain';
import axios from 'axios';

interface WorkerContextInterface {
    workerPage: Worker[];
    getAllWorkers: () => Promise<Worker[]>;
    getPageWorkers: (page: number, size: number, sort: string) => Promise<void>;
    newWorker: (worker: Worker) => Promise<void>;
    updateWorker: (worker: Worker) => Promise<void>;
    deleteWorker: (id: number) => Promise<void>;
}

export const WorkerContext = createContext<WorkerContextInterface | undefined>(
    undefined,
);

export const WorkerProvider = ({ children }: { children: React.ReactNode }) => {
    const [workerPage, setWorkerPage] = useState<Worker[]>([]);

    const getAllWorkers = async () => {
        const response = await axios.get('/worker/all');
        return response.data;
    };

    const getPageWorkers = async (page: number, size: number, sort: string) => {
        await axios
            .get(`/worker/paged?page=${page}&pageSize=${size}&sort=${sort}`)
            .then((response) => {
                setWorkerPage(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const newWorker = async (worker: Worker) => {
        axios.post('/worker/new', worker).then((response) => {
            return response.data;
        });
    };

    const updateWorker = async (worker: Worker) => {
        axios.put('/worker/update', worker).then((response) => {
            return response.data;
        });
    };

    const deleteWorker = async (id: number) => {
        axios.delete(`/worker/delete?id=${id}`).then(() => {});
    };

    useEffect(() => {
        (async () => {
            await getPageWorkers(0, 5, 'id,asc');
        })();
    }, []);

    return (
        <WorkerContext.Provider
            value={{
                workerPage,
                getAllWorkers,
                getPageWorkers,
                newWorker,
                updateWorker,
                deleteWorker,
            }}
        >
            {children}
        </WorkerContext.Provider>
    );
};