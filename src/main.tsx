import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import { AuthProvider } from './provider/AuthProvider.tsx';
import axios from 'axios';
import AuthGuard from './util/AuthGuard.tsx';
import AuthPage from './auth/AuthPage.tsx';
import { LocationProvider } from './provider/LocationProvider.tsx';
import { PersonProvider } from './provider/PersonProvider.tsx';
import { OrganizationProvider } from './provider/OrganizationProvider.tsx';
import { WorkerProvider } from './provider/WorkerProvider.tsx';
import { FileProvider } from './provider/FileProvider.tsx';

const root = document.getElementById('root');

if (root) {
    axios.defaults.baseURL = 'http://localhost:8080';
    ReactDOM.createRoot(root).render(
        <AuthProvider>
            <LocationProvider>
                <PersonProvider>
                    <OrganizationProvider>
                        <WorkerProvider>
                            <FileProvider>
                                <BrowserRouter>
                                    <Routes>
                                        <Route
                                            path="*"
                                            element={
                                                <AuthGuard>
                                                    <App />
                                                </AuthGuard>
                                            }
                                        />
                                        <Route
                                            path="/auth"
                                            element={<AuthPage />}
                                        />
                                    </Routes>
                                </BrowserRouter>
                            </FileProvider>
                        </WorkerProvider>
                    </OrganizationProvider>
                </PersonProvider>
            </LocationProvider>
        </AuthProvider>,
    );
}
