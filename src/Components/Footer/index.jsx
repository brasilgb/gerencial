import React, { Fragment } from 'react'

const Footer = () => {

    const data = new Date()
    const ano = data.getFullYear()
    return (
        <Fragment>
            <footer className="bg-gray-200 border-t-2 border-gray-100 shadow">
            <p 
            style={{textShadow: 'white 1px 1px'}}
            className="text-gray-700 py-1 text-center text-xs text-shadow-md">&copy;{ano} Solar Comércio e Agroindústria Ltda. Todos os direitos reservados. | Desenvolvido por TI - Sistemas | Grupo Solar</p>
            </footer>
        </Fragment>
    )
}

export default Footer