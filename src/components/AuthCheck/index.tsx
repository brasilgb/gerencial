"use client"

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react"
import { AuthContext } from "@/contexts/auth";
import { APP_ROUTES } from "@/constants";
import { IconContext } from "react-icons";
import { AiOutlineLoading } from "react-icons/ai";

interface AuthCheckProps {
    children: JSX.Element;
}
export const AuthCheck = ({ children }: AuthCheckProps) => {
    const { authenticated, setLoading, loading } = useContext(AuthContext);
    const { push } = useRouter();

    useEffect(() => {
        if (!authenticated) {
            push(APP_ROUTES.public.login);
            setLoading(false);
        }
    }, [authenticated, push, setLoading])

    return (
        <>
            {!authenticated &&
                loading &&
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#000000] z-10 flex items-center justify-center">
                    <IconContext.Provider value={{ className: "" }}>
                        <div className="bg-solar-gray-dark p-4 rounded-lg shadow-md border border-white">
                            <AiOutlineLoading size={30} color="#EC6608" className="animate-spin" />
                        </div>
                    </IconContext.Provider>
                </div>

            }
            {!authenticated && children}
            {authenticated && children}
        </>
    )
}