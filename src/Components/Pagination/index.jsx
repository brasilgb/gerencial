import React, { Fragment, useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { STable, STd, STh, STr } from '../../Components/Tables';
import moment from 'moment';
import { AuthContext } from '../../contexts/auth';

export const Pagination = ({data}) => {

    const { allFiliais } = useContext(AuthContext);

    const filialName = ((numFilial) => {
        const fil = allFiliais.filter((cven) => (parseInt(cven.CodFilial) === parseInt(numFilial)));
        return fil[0].Filial;
    });

    const [users, setUsers] = useState(data.slice(0, 10000));

    useEffect(() => {
      setUsers(data.slice(0, 10000));
    }, [data])
    
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 15;
    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = users
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((user, index) => {
            return (
                <STr key={index} colorRow={(index % 2)}>
                    <STd>{user.IdUsuario}</STd>
                    <STd>{user.usuario.Name}</STd>
                    <STd>{user.usuario.Code}</STd>
                    <STd>{user.usuario.Filial}</STd>
                    <STd>{filialName(user.usuario.Filial)}</STd>
                    <STd>{user.Ip}</STd>
                    <STd>{moment(user.usuario.created_at).format('DD/MM/YYYY HH:mm:ss')}</STd>
                    <STd>{moment(user.created_at).format('DD/MM/YYYY HH:mm:ss')}</STd>
                </STr>
            );
        });

    const pageCount = Math.ceil(users.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <Fragment>
            <STable>
                <STr thead={true}>
                    <STh>
                        Id Usuário
                    </STh>
                    <STh>
                        Nome Usuário
                    </STh>
                    <STh>
                        Código Vendedor
                    </STh>
                    <STh>
                        Número Filial
                    </STh>
                    <STh>
                        Nome Filial
                    </STh>
                    <STh>
                        IP
                    </STh>
                    <STh>
                        Data Cadastro
                    </STh>
                    <STh>
                        Data Acesso
                    </STh>
                </STr>
                {displayUsers}
            </STable>
            <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Próximo"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName="flex py-4 items-center justify-center paginationButtns"
                previousLinkClassName="flex items-center py-2 px-4 transform rounded-md"
                nextLinkClassName="flex items-center py-2 px-4 transform rounded-md"
                disabledClassName="flex items-center text-gray-300 cursor-not-allowed"
                activeClassName="flex items-center text-gray-50 transform bg-blue-500 rounded-md shadow-md border border-white hover:shadow-md"
            />
        </Fragment>
    );
};
