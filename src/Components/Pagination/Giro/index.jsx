import React, { Fragment, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { STable, STd, STh, STr } from '../../Tables';

export const Pagination = ({data}) => {

    const [giro, setGiros] = useState(data.slice(0, 10000));

    useEffect(() => {
      setGiros(data.slice(0, 10000));
    }, [data])
    
    const [pageNumber, setPageNumber] = useState(0);

    const giroPerPage = 20;
    const pagesVisited = pageNumber * giroPerPage;
    const displayGiros = giro
        .slice(pagesVisited, pagesVisited + giroPerPage)
        .map((user, index) => {
            return (
                <STr key={index} colorRow={(index % 2)}>
                    <STd>{user.CodSubGrupo}</STd>
                    <STd>{user.SubGrupo}</STd>
                    <STd>{user.ValorEstoque}</STd>
                    <STd>{user.ValorAtual}</STd>
                    <STd>{user.GiroFilial}</STd>
                    <STd>{user.GiroRede}</STd>
                </STr>
            );
        });

    const pageCount = Math.ceil(giro.length / giroPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <Fragment>
            <STable>
                <STr thead={true}>
                <STh>
                        Cód. Subgrupo
                    </STh>
                    <STh>
                        Subgrupo
                    </STh>
                    <STh>
                        Valor Estoque
                    </STh>
                    <STh>
                        Valor Atual
                    </STh>
                    <STh>
                        Giro Filial
                    </STh>
                    <STh>
                        Giro Rede
                    </STh>
                </STr>
                {displayGiros}
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
