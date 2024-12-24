import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router';

const Register = () => {
    document.title = 'Регистрация';
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [error, setError] = useState<string>('');

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    if (!authContext) {
        return null;
    }

    const { signup } = authContext;

    const clickHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (password !== password2) {
            setError('Пароли не совпадают');
            return;
        }
        await signup(username, password)
            .then(() => {
                navigate('/');
            })
            .catch(() => {
                setError('Неверный логин или пароль');
            });
    };

    return (
        <form className="border border-gray-500 p-10 mt-10 rounded-lg flex flex-col items-center">
            <p className="text-3xl font-bold my-4">Регистрация</p>
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
            <input
                type="password"
                placeholder="Подтверждение пароля"
                className="authput"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
            />
            <p className="italic text-red-500">{error}</p>
            <button
                className="mt-10"
                onClick={(e) => {
                    clickHandler(e);
                }}
            >
                Зарегистрироваться
            </button>
        </form>
    );
};

export default Register;
