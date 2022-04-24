import React, { useContext } from 'react';
import { IconContext } from 'react-icons';
import { FaSpinner } from 'react-icons/fa';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import { AuthProvider, AuthContext } from './contexts/auth';
import DesempenhoFiliais from './Pages/Desempenho/Filiais';
import DesempenhoVendedores from './Pages/Desempenho/Vendedores';
import AnaliseFiliais from './Pages/Analise/Filiais';
import AnaliseVendedores from './Pages/Analise/Vendedores';

const AppRoutes = () => {

    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {

            return <div className="max-h-screen flex-grow flex items-center justify-center">
                <IconContext.Provider value={{ className: "text-4xl text-gray-300 animate-spin" }}>
                    <div>
                        <FaSpinner />
                    </div>
                </IconContext.Provider>
            </div>;

        }

        if (!authenticated) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    const LoggedIn = ({ children }) => {
        const { authenticated } = useContext(AuthContext);
        if (authenticated) {
            return <Navigate to="/" />;
        }
        return children;
    };

    return (
        <Router>
            <AuthProvider>
                
                        <Routes>
                            <Route exact path="/register" element={<LoggedIn><Register /></LoggedIn>} />
                            <Route exact path="/login" element={<LoggedIn><Login /></LoggedIn>} />
                            <Route exact path="/" element={<Private><Home /></Private>} />
                            <Route exact path="/analisefiliais" element={<Private><AnaliseFiliais /></Private>} />
                            <Route exact path="/desempenhofiliais" element={<Private><DesempenhoFiliais /></Private>} />
                            <Route exact path="/analisevendedores" element={<Private><AnaliseVendedores /></Private>} />
                            <Route exact path="/desempenhovendedores" element={<Private><DesempenhoVendedores /></Private>} />
                        </Routes>

            </AuthProvider>
        </Router>
    )
};

export default AppRoutes;
