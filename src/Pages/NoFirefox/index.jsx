import React, { Fragment } from 'react'

const NoFirefox = () => {
    return (
        <Fragment>
            <div className="flex flex-row min-h-screen bg-gray-100 font-roboto">
                <div className="flex flex-col flex-grow">
                    <div className="flex h-screen items-center justify-center bg-blue-100 animate__animated animate__fadeIn animate__slow">
                        <div className="w-4/12 rounded-md p-8 bg-yellow-100 border-2 border-gray-100 shadow-lg">
                            <h1 className="font-roboto text-lg text-red-500">
                                Por segurança, a aplicação Gerencial deverá ser acessada somente pelo navegador
                                <span className="font-bold">Firefox</span>, caso seu computador não possua o navegador
                                <span className="font-bold">Firefox</span> ou o mesmo encontre-se desatualizado, por favor, entre em contato com o suporte. <br />
                                <span className="text-base text-gray-900">Agradecemos sua compreensão,</span></h1>
                            <p className="mt-4 text-sm text-gray-700 font-medium italic">TI - Sistemas | Grupo Solar</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default NoFirefox;