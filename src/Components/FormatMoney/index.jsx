import React, { Fragment } from 'react';

const FormatMoney = ({ value }) => {
    return (
        <Fragment>
            {Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value)}
        </Fragment>
    )
}

export default FormatMoney;