import React, { useContext, useState } from "react";
import NavLinks from "@/components/NavLinks";
import { links } from "@/constants";
import Image from "next/image";
import { IconContext } from "react-icons";
import { IoChevronDown, IoExit, IoLogOut, IoPerson, IoTimeOutline, IoTimeSharp } from "react-icons/io5";
import { AuthContext } from "@/contexts/auth";
import Link from "next/link";
type Props = {}

const Header = (props: Props) => {
    const { user, signOut } = useContext(AuthContext);

    return (
        <nav className="bg-solar-blue-light px-3 py-2 border-b-2 border-solar-gray-light shadow flex items-center justify-between">
            <ul className="flex items-center justify-start">
                <li className="mr-2">
                    <Link
                    href="/"
                    >
                    <Image alt="Logo Lojas Solar" width={100} height={60} src="/logo/logo_solar.png" className="w-[100px]" />
                    </Link>
                    
                </li>
                {links.map((link: any, index: any) => (
                    <NavLinks
                        key={index}
                        label={link.label}
                        href={link.url}
                    />
                ))}
            </ul>
            <div className="relative">
                <button
                    className="py-1 px-2 peer"
                >
                    <div className="flex items-center justify-center">
                        <div className="rounded-full bg-solar-orange-dark border-white w-6 h-6 flex items-center justify-center mr-1">
                            <h1 className="text-lg font-medium text-white">{user?.name.substr(0, 1)}</h1>
                        </div>
                        <IconContext.Provider value={{ className: "text-base text-white focus:text-gray-500" }}>
                            <div>
                                <IoChevronDown />
                            </div>
                        </IconContext.Provider>
                    </div>
                </button>
                
                    <div className="hidden peer-hover:flex hover:flex absolute bg-solar-gray-middle border border-white w-80 right-0 rounded shadow-lg p-1 z-20">
                        <ul className="flex flex-col w-full">
                            <li className="pb-1 py-2 px-1 flex items-center justify-start hover:bg-gray-200">
                                <IconContext.Provider value={{ className: "text-base text-gray-500" }}>
                                    <div>
                                        <IoPerson />
                                    </div>
                                </IconContext.Provider>
                                <span className="ml-2 text-sm font-medium text-gray-500">{user?.name}</span>
                            </li>
                            <li className="border-t py-2 px-1 flex items-center justify-start hover:bg-gray-200">
                                <Link
                                className="flex items-center justify-start w-full pl-0.5"
                                    href={"/accesslog"}
                                >
                                    <IconContext.Provider value={{ className: "text-base text-gray-500" }}>
                                        <div>
                                            <IoTimeSharp />
                                        </div>
                                    </IconContext.Provider>
                                    <span className="ml-2 text-sm font-medium text-gray-500">Log de acessos</span>
                                </Link>
                            </li>
                            <li className="border-t py-2 px-1 flex items-center justify-start hover:bg-gray-200">
                                <button
                                    className="flex items-center justify-start w-full pl-0.5"
                                    onClick={() => signOut()}
                                >
                                    <IconContext.Provider value={{ className: "text-base text-gray-500" }}>
                                        <div>
                                            <IoExit />
                                        </div>
                                    </IconContext.Provider>
                                    <span className="ml-2 text-sm font-medium text-gray-500">Sair</span>
                                </button>
                            </li>
                        </ul>

                    </div>
                
            </div>
        </nav>
    )
}

export default Header;