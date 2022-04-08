import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api';
// import iscobol from '../services/login';
// import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [valuesKpis, setValuesKpis] = useState([]);
    const [totalValuesKpis, setTotalValuesKpis] = useState([]);
    const [graficoVencidos, setGraficoVencidos] = useState([]);
    const [totalGraficoVencidos, setTotalGraficoVencidos] = useState([]);
    const [graficoProjecao, setGraficoProjecao] = useState([]);
    const [totalGraficoProjecao, setTotalGraficoProjecao] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [numFilial, setNumFilial] = useState();
    const [redLogin, setRedLogin] = useState(false);
    const [allFiliais, setAllFiliais] = useState([]);
    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }
        setLoading(false);
    }, []);


    function filialuser(fil) {
        setNumFilial(fil);
    }

    function redirectRegister(link, time) {
        setTimeout(() => {
            setRedLogin(true);
            if (link) {
                navigate('/login');
            }
            setErrorMessage(false);
        }, time);
    }
    function clearReload(reset, time) {
        setTimeout(() => {
            setErrorMessage(false);
            reset();
        }, time);
    }

    async function registerUser(name, code, filial, password, reset) {
        setLoading(true);
        await api.post('register', { name: name, code: code, filial: filial, password: password })

            .then((usuario) => {
                if (usuario.data.Register.success) {
                    let udata = {
                        Message: usuario.data.Register.message
                    }
                    setErrorMessage(udata);
                    setLoading(false);
                    reset();
                    redirectRegister(true, 1500);
                } else {
                    let udata = {
                        Message: usuario.data.Register.message
                    }
                    setErrorMessage(udata);
                    setRedLogin(false);
                    setLoading(false);
                    redirectRegister(false, 5000);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


    async function login(code, password, reset) {
        setLoading(true);
        await api.post('login', { code: code, password: password })
            .then((usuario) => {

                if (usuario.data.sigIn.success) {
                    let udata = {
                        Name: usuario.data.sigIn.user.name,
                        Filial: usuario.data.sigIn.user.filial,
                        Type: usuario.data.sigIn.user.type,
                        Code: usuario.data.sigIn.user.code
                    };
                    setUser(udata);
                    localStorage.setItem("user", JSON.stringify(udata));
                    setLoading(false);
                    navigate("/");
                } else {
                    let udata = {
                        Message: usuario.data.sigIn.message
                    }
                    setErrorMessage(udata);
                    setLoading(false);
                    clearReload(reset, 5000);
                }
            }).catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login")
    };

    useEffect(() => {
        async function getAllFiliais() {
            await api.get('analisekpis')
                .then((filiais) => {
                    const fsort = filiais.data.sort((a, b) => a.Filial > b.Filial ? 1 : -1);
                    setAllFiliais(fsort);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getAllFiliais();
    }, []);

    // Kpis por filial
    useEffect(() => {
        async function getKpis() {
            await api.get('analisekpis')
                .then((kpis) => {
                    const kpi = kpis.data.filter((kpi) => (kpi.CodFilial === parseInt(numFilial)));
                    kpi.sort((a, b) => parseInt(a.uid) > parseInt(b.uid) ? 1 : -1);
                    setValuesKpis(kpi);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getKpis();
    }, [numFilial]);

    // Kpis total
    useEffect(() => {
        async function getKpisTotal() {
            await api.get('analisekpistotal')
                .then((kpis) => {
                    kpis.data.sort((a, b) => parseInt(a.uid) > parseInt(b.uid) ? 1 : -1);
                    setTotalValuesKpis(kpis.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getKpisTotal();
    }, []);

    // Analise Vencidos Fiiais
    useEffect(() => {
        async function getVencidos() {
            await api.get('analisevencidos')
                .then((vencidos) => {
                    const venc = vencidos.data.filter((vencido) => (vencido.CodFilial === parseInt(numFilial)));
                    venc.sort((a, b) => parseInt(a.uid) > parseInt(b.uid) ? 1 : -1);
                    setGraficoVencidos(venc);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getVencidos();
    }, [numFilial]);

    // Analise Vencidos total
    useEffect(() => {
        async function getVencidosTotal() {
            await api.get('analisevencidostotal')
                .then((vencidos) => {
                    vencidos.data.sort((a, b) => parseInt(a.uid) > parseInt(b.uid) ? 1 : -1);
                    setTotalGraficoVencidos(vencidos.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getVencidosTotal();
    }, [numFilial]);

    // Analise projeções Filial
    useEffect(() => {
        async function getProjecoes() {
            await api.get('analiseprojecao')
                .then((projecoes) => {
                    const proj = projecoes.data.filter((projecao) => (projecao.CodFilial === parseInt(numFilial)));
                    proj.sort((a, b) => parseInt(a.uid) < parseInt(b.uid) ? 1 : -1);
                    setGraficoProjecao(proj);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getProjecoes();
    }, [numFilial]);

    // Analise projeções Totais
    useEffect(() => {
        async function getProjecoesTotal() {
            await api.get('analiseprojecaototal')
                .then((projecoes) => {
                    projecoes.data.sort((a, b) => parseInt(a.uid) < parseInt(b.uid) ? 1 : -1);
                    setTotalGraficoProjecao(projecoes.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getProjecoesTotal();
    }, [numFilial]);

    return (
        <AuthContext.Provider value={{
            authenticated:
                !!user,
            user,
            loading,
            setErrorMessage,
            filialuser,
            setNumFilial,
            errorMessage,
            registerUser,
            login,
            logout,
            redLogin,
            setRedLogin,
            allFiliais,
            valuesKpis,
            totalValuesKpis,
            graficoVencidos,
            totalGraficoVencidos,
            graficoProjecao,
            totalGraficoProjecao
        }}>
            {children}
        </AuthContext.Provider>
    )
}
