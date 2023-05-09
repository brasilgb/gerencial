interface DataDre {
    data?: any;
    estrutura?: number;
    mes?: number;
    valor?: any; // 0 = percent or 1 = value
}
export const dreListDataValue = ({ data, estrutura, mes, valor }: DataDre) => {
    const valueDre = data.filter((dt: any) => (dt.EstruturaId === estrutura && dt.Mes === mes))
        .map((val: any) => (valor === 0
            ? val.Percent
            : val.Valor
        ));
    return <span className={`${valueDre < 0 ? "text-red-400" : "text-gray-700"} ${valueDre == 0 && "!text-gray-300"}`}>
        {valor === 0
            ? ((valueDre * 100).toFixed(2)).replace('.', ',')
            : Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(valueDre)
        }
    </span>;
}