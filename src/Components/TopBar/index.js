import React, { Fragment, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { IoLogOutOutline, IoPersonCircleSharp, IoPersonOutline } from "react-icons/io5";
import useOnClickOutside from '../ClickOutside';
const TopBar = ({ logout, user }) => {

    const ref = useRef();
    const [openMenu, setOpenMenu] = useState(false);
    useOnClickOutside(ref, () => setOpenMenu(false));
    return (
        <Fragment>
            <div className="bg-solar-blue-200 border-b-2 border-white shadow">
                <div className="flex items-center justify-between">
                    <div className="px-2 py-1">
                        <img className="w-32" src="/images/logo-solar.png" alt="Logo" />
                    </div>
                    <div className="px-2">
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
                                <span className="flex items-baseline px-4 py-2 text-gray-800 transition-colors duration-200 transform border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">
                                    <IconContext.Provider value={{ className: "text-sm text-gray-500" }}>
                                        <div>
                                            <IoPersonOutline />
                                        </div>
                                    </IconContext.Provider>
                                    <span className="text-md px-2 text-gray-500">{user.Name}</span>
                                </span>
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