import React, { Fragment, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { IoLogOutOutline, IoPersonCircleSharp, IoPersonOutline, IoTimeOutline } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import useOnClickOutside from '../ClickOutside';
import SessionTimeOut from '../SessionTimeOut';

const TopBar = ({ logout, user }) => {

    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split('/')[pathname.split('/').length - 1];

    const ref = useRef();
    const [openMenu, setOpenMenu] = useState(false);
    useOnClickOutside(ref, () => setOpenMenu(false));

    return (
        <Fragment>
            <SessionTimeOut />
            <div className="bg-solar-blue-200 border-b-2 border-white shadow">
                <div className="flex items-center justify-between">
                    <div className="px-2 py-1 w-40">
                        <img className="w-32" src="/images/logo-solar.png" alt="Logo" />
                    </div>
                    <div className="w-full pl-10">

                        <Link
                            className={`${splitLocation === "" ? "bg-white text-gray-600" : "text-gray-100"} uppercase text-sm font-medium px-2 py-5 mr-2`}
                            to="/">
                            <span>Análise de Vencidos</span>
                        </Link>

                        <Link
                            className={`${splitLocation === "analisefiliais" ? "bg-white text-gray-600" : "text-gray-100"} uppercase text-sm font-medium px-2 py-5 mr-2 `}
                            to="/analisefiliais">
                            <span>Análise de Filiais</span>
                        </Link>

                        <Link
                            className={`${splitLocation === "desempenhofiliais" ? "bg-white text-gray-600" : "text-gray-100"} uppercase text-sm font-medium px-2 py-5 mr-2 `}
                            to="/desempenhofiliais">
                            <span>Desempenho de Filiais</span>
                        </Link>

                        <Link
                            className={`${splitLocation === "analisevendedores" ? "bg-white text-gray-600" : "text-gray-100"} uppercase text-sm font-medium px-2 py-5 mr-2 `}
                            to="/analisevendedores">
                            <span>Análise de Vendedores</span>
                        </Link>
                       
                        <Link
                            className={`${splitLocation === "giroestoque" ? "bg-white text-gray-600" : "text-gray-100"} uppercase text-sm font-medium px-2 py-5 mr-2 `}
                            to="/giroestoque">
                            <span>Giro de Estoque</span>
                        </Link>
                       
                    </div>
                    <div className="px-2 w-14">
                        <button
                            onClick={() => setOpenMenu(!openMenu)}
                            className="relative z-10 block bg-gray-50 rounded-full">
                            <IconContext.Provider value={{ className: "text-4xl text-solar-yellow-200" }}>
                                <div>
                                    <IoPersonCircleSharp />
                                </div>
                            </IconContext.Provider>
                        </button>
                        {openMenu &&
                            <div ref={ref} className="absolute right-2 z-20 w-56 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-700">
                                <span className="flex items-baseline px-4 py-2 text-gray-800 border-b">
                                    <IconContext.Provider value={{ className: "text-sm text-gray-500" }}>
                                        <div>
                                            <IoPersonOutline />
                                        </div>
                                    </IconContext.Provider>
                                    <span className="text-md px-2 text-gray-500">{user.Name}</span>
                                </span>
                                <Link to="/logacesso" className="flex items-baseline px-4 py-2 text-gray-800 transition-colors duration-200 transform border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">
                                    <IconContext.Provider value={{ className: "text-sm text-gray-500" }}>
                                        <div>
                                            <IoTimeOutline />
                                        </div>
                                    </IconContext.Provider>
                                    <span className="text-md px-2 text-gray-500">Log de Acesso</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center px-4 py-2 text-gray-800 transition-colors duration-200 transform dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">
                                    <IconContext.Provider value={{ className: "text-sm text-gray-500" }}>
                                        <div>
                                            <IoLogOutOutline />
                                        </div>
                                    </IconContext.Provider>
                                    <span className="block text-md px-2 text-gray-500">Sair</span>
                                </button>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </Fragment>

    )
};

export default TopBar;