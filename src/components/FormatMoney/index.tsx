import React, { Fragment } from 'react';

const FormatMoney = ({ value }:any) => {
    return (
        <Fragment>
            {Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value)}
        </Fragment>
    )
}

export default FormatMoney;