import React, { Fragment, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { STable, STd, STh, STr } from '../../Tables';

const useSortableData = (items, config = null) => {

    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
        let sortableItems = items;
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

export const Pagination = ({ data }) => {

    const { items, requestSort, sortConfig } = useSortableData(data);

    const getClassNamesFor = (name) => {

        if (!sortConfig) {
            return 'default';
        }
        return sortConfig.key === name ? sortConfig.direction : ' default ';
    };

    const [pageNumber, setPageNumber] = useState(0);

    const giroPerPage = 20;
    const pagesVisited = pageNumber * giroPerPage;
    const displayGiros = items
        .slice(pagesVisited, pagesVisited + giroPerPage)
        .map((gir, index) => {
            return (
                <STr key={index} colorRow={(index % 2)}>
                    <STd>{gir.codigoSubgrupo}</STd>
                    <STd>{gir.descricaoSubgrupo}</STd>
                    {/* <STd>{ gir.valorEstoque }</STd>
                    <STd>{ gir.valorAtual }</STd> */}
                    <STd>{((gir.valorEstoque) * 1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</STd>
                    <STd>{ ((gir.valorAtual)*1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</STd>
                    <STd>{gir.giroFilial}</STd>
                    <STd>{gir.giroRede}</STd>
                </STr>
            );
        });

    const pageCount = Math.ceil(items.length / giroPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <Fragment>
            
            <STable>
                <STr thead={true}>
                    <STh largura="w-44">
                        <button
                            type="button"
                            onClick={() => requestSort('codigoSubgrupo')}
                            className={`${getClassNamesFor('codigoSubgrupo')}`}
                        >
                            <span className="text-gray-600 text-shadow-md py-2 text-sm font-bold uppercase">
                                Cód. Subgrupo
                            </span>
                        </button>
                    </STh>
                    <STh largura="w-96">
                        <button
                            type="button"
                            onClick={() => requestSort('descricaoSubgrupo')}
                            className={getClassNamesFor('descricaoSubgrupo')}
                        >
                            <span className="text-gray-600 text-shadow-md py-2 text-sm font-bold uppercase w-">
                                Subgrupo
                            </span>
                        </button>
                    </STh>
                    <STh largura="w-56">
                        <button
                            type="button"
                            onClick={() => requestSort('valorEstoque')}
                            className={getClassNamesFor('valorEstoque')}
                        >
                            <span className="text-gray-600 text-shadow-md py-2 text-sm font-bold uppercase">
                                Valor Estoque
                            </span>
                        </button>
                    </STh>
                    <STh largura="w-56">
                        <button
                            type="button"
                            onClick={() => requestSort('valorAtual')}
                            className={getClassNamesFor('valorAtual')}
                        >
                            <span className="text-gray-600 text-shadow-md py-2 text-sm font-bold uppercase">
                                Valor Atual
                            </span>
                        </button>
                    </STh>
                    <STh largura="w-56">
                        <button
                            type="button"
                            onClick={() => requestSort('giroFilial')}
                            className={getClassNamesFor('giroFilial')}
                        >
                            <span className="text-gray-600 text-shadow-md px-2 py-2 text-sm font-bold uppercase">
                                Giro Filial
                            </span>
                        </button>
                    </STh>
                    <STh largura="w-56">
                        Giro Rede
                    </STh>
                </STr>
                {displayGiros}
            </STable>
            {items.length > 0 &&
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
            }
        </Fragment>
    );
};
