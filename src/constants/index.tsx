export const links = [
    { label: "Análise de Vencidos", url: "/" },
    { label: "Faturamento", url: "/faturamento" },
    { label: "Análise de Filiais", url: "/analisefiliais" },
    { label: "Desempenho de Filiais", url: "/desempenhofiliais" },
    { label: "Análise de Vendedores", url: "/analisevendedor" },
    { label: "Giro de Estoque", url: "/giroestoque" },
    { label: "DRE", url: "/dre" },
];

export const APP_ROUTES = {
    private: {
        home: {
            name: '/'
        },
        analisefiliais: {
            name: '/analisefiliais'
        },
        desempenhofiliais: {
            name: '/desempenhofiliais'
        },
        analisevendedor: {
            name: '/analisevendedor'
        },
        giroestoque: {
            name: '/giroestoque'
        },
        dre: {
            name: '/dre'
        },
        accesslog: {
            name: '/accesslog'
        },
    },
    public: {
        login:'/login',
        register: '/register'
    }
}