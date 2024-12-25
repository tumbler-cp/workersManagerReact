import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../provider/AdminProvider";
import { AdminRequest, Log } from "../model/Admin";

const Admin = () => {
    const [reqestContent, setRequestContext] = useState<AdminRequest[]>([]);
    const [logsContent, setLogsContent] = useState<Log[]>([]);

    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        return null;
    }

    const {
        requests,
        logs,
        getAdminRequests,
        getLogs,
        acceptAdminRequest,
        rejectAdminRequest,
    } = adminContext;

    useEffect(() => {
        setRequestContext(requests);
        setLogsContent(logs);
    });

    useEffect(() => {
        getAdminRequests();
        getLogs();
    }, []);

    return (
        <div className="flex flex-row mx-auto my-auto gap-10 p-5">
            {/* Admin Requests Section */}
            <div className="flex flex-col flex-grow border rounded-lg shadow-md p-5">
                <h1 className="text-2xl font-bold mb-4 text-center">Admin Requests</h1>
                {reqestContent.length > 0 ? (
                    <ul className="space-y-3">
                        {requests.map((req) => (
                            <li
                                key={req.id}
                                className="flex justify-between items-center p-3 border rounded-md hover:shadow-sm transition"
                            >
                                <span>
                                    <strong>User ID:</strong> {req.userId} <br />
                                    <strong>Status:</strong> {req.status}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        className="px-3 py-1 ml-3"
                                        onClick={() => acceptAdminRequest(req)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="px-3 py-1"
                                        onClick={() => rejectAdminRequest(req)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No requests available</p>
                )}
            </div>

            {/* Logs Section */}
            <div className="flex flex-col flex-grow border rounded-lg shadow-md p-5 max-h-96 overflow-auto">
                <h1 className="text-2xl font-bold mb-4 text-center">Logs</h1>
                {logsContent.length > 0 ? (
                    <ul className="space-y-3">
                        {logs.map((log) => (
                            <li
                                key={log.id}
                                className="p-3 border rounded-md hover:shadow-sm transition"
                            >
                                <p>
                                    <strong>{log.username}</strong> (ID: {log.userId}){" "}
                                    performed <strong>{log.changeType}</strong> on{" "}
                                    <strong>{log.workerName}</strong> (ID: {log.workerId})
                                </p>
                                <p className="text-sm text-gray-500">{log.time}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No logs available</p>
                )}
            </div>
        </div>
    );
};

export default Admin;
