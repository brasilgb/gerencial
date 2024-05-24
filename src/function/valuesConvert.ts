const parseValueMoney = (value: any) => {
    return Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(isNaN(value) ? 0 : value)
}

const parseValuePercent = (value: any) => {
    return (((isNaN(value) ? 0 : value) * 100).toFixed(2)).replace('.', ',')+'%'
}

export { parseValueMoney, parseValuePercent }