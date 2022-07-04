import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api';
import isCobol from "../services/isCobol";
import moment from "moment";
import { isFirefox } from 'react-device-detect';
// import iscobol from '../services/login';
// import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isFirefox) {
            navigate('/nofirefox');
        }
    })

    const [user, setUser] = useState(null);
    const [userAccess, setUserAccess] = useState([]);
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

    const [analiseFiliaisKpis, setAnaliseFiliaisKpis] = useState([]);
    const [inadimplenciaKpis, setInadimplenciaKpis] = useState([]);
    const [giroEstoqueKpis, setGiroEstoqueKpis] = useState([]);
    const [giroSubGrupo, setGiroSubGrupo] = useState([]);
    const [giroSubGrupoFilial, setGiroSubGrupoFilial] = useState([]);
    const [conversaoKpis, setConversaoKpis] = useState([]);
    const [analiseVendedoresKpis, setAnaliseVendedoresKpis] = useState([]);
    const [conversaoVendedoresKpis, setConversaoVendedoresKpis] = useState([]);
    const [margemVendedor, setMargemVendedor] = useState([]);

    const [loadList, setLoadList] = useState(true);
    const [loadButton, setLoadButton] = useState(false)

    const [dataFiltroIni, setDataFiltroIni] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [dataFiltroFin, setDataFiltroFin] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [searchFilial, setSearchFilial] = useState("false");
    const [searchSubGrupo, setSearchSubGrupo] = useState("false");
    const [searchGiro, setSearchGiro] = useState("false");
    const [dataDoGiro, setDataDoGiro] = useState(moment(new Date()).format('DD/MM/YYYY HH:mm:ss'));

    function dataSearch(inicial, final, filial) {
        setDataFiltroIni(inicial);
        setDataFiltroFin(final);
        setSearchFilial(filial);
        setNumFilial(filial);
    }

    function giroSearch(filial, subgrupo, giro) {
        setSearchFilial(filial);
        setSearchSubGrupo(subgrupo);
        setSearchGiro(giro);
        setNumFilial(filial);
    }

    function dateFormat(date) {
        return moment(date).format('YYYY-MM-DD');
    }

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");
        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
            setNumFilial(JSON.parse(recoveredUser).Filial);
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
                        IdUsuario: usuario.data.sigIn.user.idusuario,
                        Name: usuario.data.sigIn.user.name,
                        Filial: usuario.data.sigIn.user.filial,
                        Type: usuario.data.sigIn.user.type,
                        Code: usuario.data.sigIn.user.code
                    };
                    setUser(udata);
                    localStorage.setItem("user", JSON.stringify(udata));
                    setLoading(false);
                    navigate("/");
                    window.location.reload();
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

    useEffect(() => {
        async function getUserAccess() {
            setLoadButton(true);
            await api.get('listusersaccess')
                .then((access) => {
                    if (searchFilial === "false") {
                        const userAccess = access.data.filter((fu) => (dateFormat(fu.created_at) >= dataFiltroIni & dateFormat(fu.created_at) <= dataFiltroFin));
                        userAccess.sort((a, b) => parseInt(a.uid) < parseInt(b.uid) ? 1 : -1);
                        setUserAccess(userAccess);
                        setLoadButton(false);
                    } else {
                        const userAccess = access.data.filter((fu) => (dateFormat(fu.created_at) >= dataFiltroIni & dateFormat(fu.created_at) <= dataFiltroFin & fu.usuario.Filial === searchFilial));
                        userAccess.sort((a, b) => parseInt(a.uid) < parseInt(b.uid) ? 1 : -1);
                        setUserAccess(userAccess);
                        setLoadButton(false);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getUserAccess();

    }, [dataFiltroIni, dataFiltroFin, searchFilial]);

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

    // Gerencial analise de filiais
    useEffect(() => {
        async function getAnaliseFiliais() {
            await api.get('analisefiliais')
                .then((analisefiliais) => {
                    const venc = analisefiliais.data.filter((analise) => (parseInt(analise.CodFilial) === parseInt(numFilial)));
                    venc.sort((a, b) => parseInt(a.uid) > parseInt(b.uid) ? 1 : -1);
                    setAnaliseFiliaisKpis(venc);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getAnaliseFiliais();

    }, [numFilial]);

    // Gerencial Inadimplencia
    useEffect(() => {
        async function getInadimplencia() {
            await api.get('inadimplencia')
                .then((inadimplencia) => {
                    const inad = inadimplencia.data.filter((analise) => (parseInt(analise.CodFilial) === parseInt(numFilial)));
                    inad.sort((a, b) => parseInt(a.uid) > parseInt(b.uid) ? 1 : -1);
                    setInadimplenciaKpis(inad);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getInadimplencia();

    }, [numFilial]);

    // Gerencial Giro Estoque
    useEffect(() => {
        async function getGiroEstoque() {
            await api.get('giroestoque')
                .then((giro) => {
                    const gir = giro.data.filter((g) => (parseInt(g.CodFilial) === parseInt(numFilial)));
                    gir.sort((a, b) => parseInt(a.uid) > parseInt(b.uid) ? 1 : -1);
                    setGiroEstoqueKpis(gir);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getGiroEstoque();
        const interval = setInterval(() => {
            getGiroEstoque();
        }, 10000)

        return () => clearInterval(interval)
    }, [numFilial]);


    // Gerencial Giro Estoque
    useEffect(() => {
        async function getGiroSubGrupo() {
            if (!isFirefox)
                setLoadButton(true);
            await isCobol.get(`http://172.16.1.43:9090/servicecomercial/servlet/isCobol(AR_ESTOQUE_IDEAL)?filial=${numFilial}`)
                // await isCobol.get(`http://172.16.1.34:8081/servicecomercial/servlet/isCobol(AR_ESTOQUE_IDEAL)?filial=${numFilial}`)
                .then((girosub) => {
                    // console.log(girosub.data.resposta.data.dados[0]);
                    setGiroSubGrupoFilial(girosub.data.resposta.data.dados);
                    if (searchSubGrupo === '' & !searchGiro) {

                        const girsub = girosub.data.resposta.data.dados.filter((gs) => (
                            parseInt(gs.giroFilial) !== 0 &
                            parseInt(gs.giroRede) !== 0
                        ));
                        setGiroSubGrupo(girsub);
                        setLoadButton(false);

                    } else if (searchSubGrupo !== '' & !searchGiro) {

                        const girsub = girosub.data.resposta.data.dados.filter((gs) => (
                            (parseInt(gs.codigoSubgrupo) === parseInt(searchSubGrupo) || (gs.descricaoSubgrupo.toUpperCase()).includes(searchSubGrupo.toUpperCase())) &
                            parseInt(gs.giroFilial) !== 0 &
                            parseInt(gs.giroRede) !== 0
                        ));
                        setGiroSubGrupo(girsub);
                        setLoadButton(false);

                    } else if (searchGiro === true) {

                        const girsub = girosub.data.resposta.data.dados.filter((gs) => (
                            parseInt(gs.giroFilial) === 0 &
                            parseInt(gs.giroRede) === 0
                        ));
                        setGiroSubGrupo(girsub);
                        setLoadButton(false);

                    } else {

                        const girsub = girosub.data.resposta.data.dados.filter((gs) => (
                            parseInt(gs.giroFilial) !== 0 &
                            parseInt(gs.giroRede) !== 0
                        ));
                        setGiroSubGrupo(girsub);
                        setLoadButton(false);
                    }

                })
                .catch(err => {
                    console.log(err);
                })
        }
        getGiroSubGrupo();
        const interval = setInterval(() => {
            setDataDoGiro(moment(new Date()).format('DD/MM/YYYY HH:mm:ss'));
            getGiroSubGrupo();
        }, 10000)

        return () => clearInterval(interval)

    }, [searchFilial, searchSubGrupo, searchGiro, numFilial]);

    useEffect(() => {
        async function getConversao() {
            await api.get('conversaofiliais')
                .then((conversao) => {
                    setConversaoKpis(conversao.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getConversao();

    }, []);

    // Gerencial analise de vendedores
    useEffect(() => {
        async function getAnaliseVendedores() {
            setLoadList(true);
            await api.get('analisevendedores')
                .then((analisevendedores) => {
                    const vend = analisevendedores.data.filter((aven) => (parseInt(aven.CodFilial) === parseInt(numFilial) & aven.ValorVenda > 0));
                    vend.sort((a, b) => parseInt(a.ValorVenda) < parseInt(b.ValorVenda) ? 1 : -1);
                    setAnaliseVendedoresKpis(vend);
                    setLoadList(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getAnaliseVendedores();
        const interval = setInterval(() => {
            getAnaliseVendedores();
        }, 20000)

        return () => clearInterval(interval)
    }, [numFilial]);

    // Gerencial Melhor Conversão de vendedores
    useEffect(() => {
        async function getConversaoVendedores() {
            setLoadList(true);
            await api.get('conversaovendedores')
                .then((cvendedores) => {
                    const vend = cvendedores.data.filter((cven) => (parseInt(cven.CodFilial) === parseInt(numFilial)));
                    vend.sort((a, b) => parseInt(a.ValorVenda) < parseInt(b.ValorVenda) ? 1 : -1);
                    setConversaoVendedoresKpis(vend);
                    setLoadList(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getConversaoVendedores();
        const interval = setInterval(() => {
            getConversaoVendedores();
        }, 20000)

        return () => clearInterval(interval)
    }, [numFilial]);

    // Gerencial analise de vendedores
    useEffect(() => {
        async function getMargemVendedor() {
            setLoadList(true);
            await api.get('margemvendedor')
                .then((margemvendedor) => {
                    const vend = margemvendedor.data.filter((aven) => (parseInt(aven.CodFilial) === parseInt(numFilial)));
                    setMargemVendedor(vend);
                    setLoadList(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getMargemVendedor();
        const interval = setInterval(() => {
            getMargemVendedor();
        }, 20000)

        return () => clearInterval(interval)
    }, [numFilial]);

    return (
        <AuthContext.Provider value={{
            authenticated:
                !!user,
            user,
            userAccess,
            loading,
            setErrorMessage,
            filialuser,
            setNumFilial,
            setSearchFilial,
            searchFilial,
            errorMessage,
            registerUser,
            login,
            logout,
            redLogin,
            setRedLogin,
            dataSearch,
            giroSearch,
            allFiliais,
            numFilial,
            valuesKpis,
            totalValuesKpis,
            graficoVencidos,
            totalGraficoVencidos,
            graficoProjecao,
            totalGraficoProjecao,
            analiseFiliaisKpis,
            inadimplenciaKpis,
            giroEstoqueKpis,
            giroSubGrupo,
            giroSubGrupoFilial,
            dataDoGiro,
            conversaoKpis,
            analiseVendedoresKpis,
            conversaoVendedoresKpis,
            margemVendedor,
            loadList,
            loadButton
        }}>
            {children}
        </AuthContext.Provider>
    )
}
