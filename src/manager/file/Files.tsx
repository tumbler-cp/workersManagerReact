import { useContext, useEffect, useState } from 'react';
import { FileLog } from '../../model/Domain';
import { FileContext } from '../../provider/FileProvider';
import { FaFileAlt } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa6';

const FileLogElement = ({ log }: { log: FileLog }) => {
    return (
        <div className="m-10 p-5 border border-white rounded-lg flex flex-row items-center">
            <div className="flex pr-10 flex-col items-center">
                <FaFileAlt className="m-auto" color="white" size={70} />
                <p className="filename text-white mt-2">{log.fileName}</p>
            </div>
            <div className="flex-grow">
                <div className="mb-2">
                    <label className="text-gray-400 block">Тип</label>
                    <p className="text-white">{log.className}</p>
                </div>
                <div className="mb-2">
                    <label className="text-gray-400 block">Количество</label>
                    <p className="text-white">{log.quantity}</p>
                </div>
                <div className="mb-2">
                    <label className="text-gray-400 block">Пользователь</label>
                    <p className="text-white">{log.owner.username}</p>
                </div>
                <div>
                    <label className="text-gray-400 block">Время</label>
                    <p className="text-white">{log.timestamp}</p>
                </div>
            </div>
            {/* <div className="flex p-5">
                <FaDownload
                    className="ml-auto my-auto"
                    color="white"
                    size={50}
                />
            </div> */}
        </div>
    );
};

const Files = () => {
    const [files, setFiles] = useState<FileLog[]>([]);

    const fileContext = useContext(FileContext);

    if (!fileContext) {
        console.error('FileContext is not set');
        return null;
    }

    useEffect(() => {
        setFiles(fileContext.fileList);
    }, [fileContext.fileList]);

    return (
        <div className="m-auto">
            {files.map((file) => (
                <FileLogElement key={file.id} log={file} />
            ))}
        </div>
    );
};

export default Files;
