import React, { Fragment, useContext } from 'react';
import Footer from '../../../Components/Footer';
import TopBar from '../../../Components/TopBar';
import { AuthContext } from '../../../contexts/auth';

const DesempenhoVendedores = () => {

    const { user, logout } = useContext(AuthContext);

    return (
        <Fragment>
            <TopBar user={user} logout={logout} />
            <div className="flex flex-col flex-grow px-2">
                <div className="flex items-center justify-between my-2">
                    <div className=" w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Melhor Desempenho da Rede
                    </div>
                    <div className="w-2/5 text-md text-gray-500 px-4 rounded text-shadow">
                        Análise de Vendedores
                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Atualização de dados:&nbsp;
                        {/* {conversaoKpis.map((value) => (value.Atualizacao))} */}
                    </div>

                </div>

            </div>
            <Footer />
        </Fragment>
    )
}

export default DesempenhoVendedores;