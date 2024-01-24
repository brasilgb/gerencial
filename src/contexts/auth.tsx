"use client"

import React, { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import apiphpmysql from "@/app/api/apiphpmysql";
import { useRouter } from 'next/navigation';
import moment from "moment";
import apiiscobol from "@/app/api/apiiscobol";

export const AuthContext = createContext<any>({} as any);
interface AuthProps {
    children: ReactNode;
}

interface UserProps {
    name: string;
    code: any;
    filial: string;
    password: string;
}

export const AuthProvider = ({ children }: AuthProps) => {

    const { push } = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [messageLogin, setMessageLogin] = useState(false);
    const [filialAtiva, setFilialAtiva] = useState(8);
    const [yearExists, setYearExists] = useState(false);
    const [yearSelected, setYearSelected] = useState<any>(moment().format("YYYY"));

    useEffect(() => {
        const getYearSelected = async () => {
            await apiiscobol.post(`(DRE_REL)`,
                {
                    "dreidenti": 4,
                    "dredepto": 0,
                    "drefilial": 0,
                    "dreano": yearSelected
                })
                .then((response) => {
                    const { success, bidata } = response.data.bi057;
                    const exists = bidata.some((val: any) => { return val.Ano === moment().format("YYYY") });
                    if (!exists) {
                        setYearExists(exists);
                        setYearSelected(moment().add(-1, "y").format("YYYY"));
                        return;
                    }
                    setYearSelected(moment().format("YYYY"));
                }).catch((error) => {
                    console.log(error);
                })
        };
        getYearSelected();
    }, []);

    useEffect(() => {
        const loadStorage = (async () => {
            const recoveredUser = localStorage.getItem("Auth_user");
            if (recoveredUser) {
                setUser(JSON.parse(recoveredUser));
            }
        });
        loadStorage();
    }, []);

    const registerUser = useCallback(async ({ name, code, filial, password }: UserProps) => {
        setLoading(true);
        const response = await apiphpmysql.post('register', { name: name, code: code, filial: filial, password: password })
        const { success, message } = response.data.Register;
        if (!success) {
            setMessageLogin(message);
            setLoading(false);
            return;
        }
        setMessageLogin(message);
        setTimeout(() => {
            push('/login');
            setLoading(false);
            setMessageLogin(false);
        }, 500)
    }, [push]);

    const signIn = useCallback(async ({ code, password }: UserProps) => {
        setMessageLogin(false);
        setLoading(true);
        const response = await apiphpmysql.post('login', { code: code, password: password });
        const { success, message } = response.data.sigIn;
        if (!success) {
            setMessageLogin(message);
            setLoading(false);
            return;
        }
        let udata = {
            usuario: response.data.sigIn.user.idusuario,
            name: response.data.sigIn.user.name,
            filial: response.data.sigIn.user.filial,
            type: response.data.sigIn.user.type,
            code: response.data.sigIn.user.code
        };
        localStorage.setItem("Auth_user", JSON.stringify(udata));
        setFilialAtiva(response.data.sigIn.user.filial);
        setUser(udata);
        push('/');
        setLoading(false);
    }, [push]);

    const signOut = (async () => {
        push('/login');
        localStorage.removeItem("Auth_user");
        setUser(null);
    });

    return (
        <AuthContext.Provider value={{
            authenticated: !!user,
            user,
            registerUser,
            signIn,
            signOut,
            setLoading,
            setYearSelected,
            yearSelected,
            yearExists,
            loading,
            messageLogin,
            filialAtiva,
            setFilialAtiva
        }}>
            {children}
        </AuthContext.Provider>
    )
}
