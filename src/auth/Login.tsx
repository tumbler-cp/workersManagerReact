import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router';

const Login = () => {
    document.title = 'Вход';
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    if (!authContext) {
        return null;
    }

    const { signin } = authContext;

    const clickHandler = async (e: FormEvent) => {
        e.preventDefault();
        await signin(username, password)
            .then(() => {
                navigate('/');
            })
            .catch(() => {
                setError('Неверный логин или пароль');
            });
    };

    return (
        <form className="border border-gray-500 p-10 mt-10 rounded-lg flex flex-col items-center">
            <p className="text-3xl font-bold my-4">Вход</p>
            <input
                type="text"
                placeholder="Логин"
                className="authput"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Пароль"
                className="authput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <p className="italic text-red-500">{error}</p>
            <button
                className="mt-10"
                onClick={(e) => {
                    clickHandler(e);
                }}
            >
                Войти
            </button>
        </form>
    );
};

export default Login;
