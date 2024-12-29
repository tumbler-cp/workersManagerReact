import { createContext, useState } from 'react';
import { AdminRequest, AdminRequestStatus, Log } from '../model/Admin';
import axios from 'axios';

interface AdminContextType {
    requests: AdminRequest[];
    logs: Log[];
    getAdminRequests: () => Promise<void>;
    getLogs: () => Promise<void>;
    acceptAdminRequest: (req: AdminRequest) => Promise<void>;
    rejectAdminRequest: (req: AdminRequest) => Promise<void>;
}

export const AdminContext = createContext<AdminContextType | undefined>(
    undefined,
);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
    const [requests, setRequests] = useState<AdminRequest[]>([]);
    const [logs, setLogs] = useState<Log[]>([]);

    const getAdminRequests = async () => {
        await axios.get('/admin/reqlist').then((response) => {
            setRequests(response.data);
        });
    };

    const acceptAdminRequest = async (req: AdminRequest) => {
        req.status = AdminRequestStatus.ACCEPTED;
        await axios.put(`/admin/update`, req).then(() => {
            getAdminRequests();
        });
    };

    const rejectAdminRequest = async (req: AdminRequest) => {
        req.status = AdminRequestStatus.REJECTED;
        await axios.put(`/admin/update`, req).then(() => {
            getAdminRequests();
        });
    };

    const getLogs = async () => {
        await axios.get('/admin/logs').then((response) => {
            setLogs(response.data);
        });
    };

    return (
        <AdminContext.Provider
            value={{
                requests,
                logs,
                getAdminRequests,
                getLogs,
                acceptAdminRequest,
                rejectAdminRequest,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
