import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import {ToastProvider} from './context/ToastContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import UserDashboard from './pages/UserDashboard.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import UserLayout from "./layouts/UserLayout.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";

function App() {
    return (
        <ToastProvider>
            <AuthProvider>
                <Router>
                    <div className="min-h-screen bg-gray-100">
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <UserLayout>
                                            <UserDashboard/>
                                        </UserLayout>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/admin"
                                element={
                                    <PrivateRoute adminOnly>
                                        <AdminLayout>
                                            <AdminDashboard/>
                                        </AdminLayout>
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </div>
                </Router>
            </AuthProvider>
        </ToastProvider>
    );
}

export default App;
