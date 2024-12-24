import { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthPage = () => {
    const [isLogging, setIsLogging] = useState<boolean>(true);

    return (
        <div className="h-screen w-screen bg-black text-white flex flex-col">
            <div className="flex flex-col items-center justify-center mx-auto my-auto">
                <button
                    onClick={() => {
                        setIsLogging(!isLogging);
                    }}
                >
                    {isLogging ? 'Зарегистрироваться' : 'Войти'}
                </button>
                {isLogging ? <Login /> : <Register />}
            </div>
        </div>
    );
};

export default AuthPage;
