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
import Gerencial from './Pages/Gerencial';
import Desempenho from './Pages/Desempenho';

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
                {/* <TransitionGroup>
                    <CSSTransition> */}
                        <Routes>
                            <Route exact path="/register" element={<LoggedIn><Register /></LoggedIn>} />
                            <Route exact path="/login" element={<LoggedIn><Login /></LoggedIn>} />
                            <Route exact path="/" element={<Private><Home /></Private>} />
                            <Route exact path="/gerencial" element={<Private><Gerencial /></Private>} />
                            <Route exact path="/desempenho" element={<Private><Desempenho /></Private>} />
                        </Routes>
                    {/* </CSSTransition>
                </TransitionGroup> */}
            </AuthProvider>
        </Router>
    )
};

export default AppRoutes;
