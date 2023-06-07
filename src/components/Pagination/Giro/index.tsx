"use client"

import React, { Fragment, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { STable, STd, STh, STr } from "../../Tables";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { TiArrowUnsorted } from "react-icons/ti";
import { IconContext } from "react-icons";

const useSortableData = (items: any, config: any = null) => {

    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
        let sortableItems = items;
        if (sortConfig !== null) {
            sortableItems.sort((a: any, b: any) => {
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

    const requestSort = (key: any) => {
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

export const Pagination = ({ data }: any) => {

    const { items, requestSort, sortConfig } = useSortableData(data);

    const getClassNamesFor = (name: any) => {

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
        .map((gir: any, index: any) => {
            return (
                <STr key={index} colorRow={(index % 2)}>
                    <STd>{gir.codigoSubgrupo}</STd>
                    <STd>{gir.descricaoSubgrupo}</STd>
                    <STd>{((gir.valorEstoque) * 1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</STd>
                    <STd>{((gir.valorAtual) * 1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</STd>
                    <STd>{gir.giroFilial}</STd>
                    <STd>{gir.giroRede}</STd>
                </STr>
            );
        });

    const pageCount = Math.ceil(items.length / giroPerPage);
    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };

    const headerClass = {
        default: "border-r border-t text-xs font-semibold bg-solar-blue-light !text-white",
    }

    return (
        <Fragment>

            <STable>
                <thead>
                    <STr>
                        <STh classname={`w-44 ${headerClass.default}`}>
                            <button
                                type="button"
                                onClick={() => requestSort('codigoSubgrupo')}
                                className={`${getClassNamesFor('codigoSubgrupo')} flex items-center justify-start`}
                            >
                                <IconContext.Provider value={{ className: "" }}>
                                    <div>
                                        <TiArrowUnsorted size={14} />
                                    </div>
                                </IconContext.Provider>
                                <span className="text-white text-shadow-md py-2 text-sm font-bold mr-2">
                                    Cód. Subgrupo
                                </span>
                            </button>
                        </STh>
                        <STh classname={`w-96 ${headerClass.default}`}>
                            <button
                                type="button"
                                onClick={() => requestSort('descricaoSubgrupo')}
                                className={`${getClassNamesFor('descricaoSubgrupo')} flex items-center justify-start`}
                            >
                                <IconContext.Provider value={{ className: "" }}>
                                    <div>
                                        <TiArrowUnsorted size={14} />
                                    </div>
                                </IconContext.Provider>
                                <span className="text-white text-shadow-md py-2 text-sm font-bold mr-2">
                                    Subgrupo
                                </span>
                            </button>
                        </STh>
                        <STh classname={`w-56 ${headerClass.default}`}>
                            <button
                                type="button"
                                onClick={() => requestSort('valorEstoque')}
                                className={`${getClassNamesFor('valorEstoque')} flex items-center justify-start`}
                            >
                                <IconContext.Provider value={{ className: "" }}>
                                    <div>
                                        <TiArrowUnsorted size={14} />
                                    </div>
                                </IconContext.Provider>
                                <span className="text-white text-shadow-md py-2 text-sm font-bold mr-2">
                                    Valor estoque
                                </span>
                            </button>
                        </STh>
                        <STh classname={`w-56 ${headerClass.default}`}>
                            <button
                                type="button"
                                onClick={() => requestSort('valorAtual')}
                                className={`${getClassNamesFor('valorAtual')} flex items-center justify-start`}
                            >
                                <IconContext.Provider value={{ className: "" }}>
                                    <div>
                                        <TiArrowUnsorted size={14} />
                                    </div>
                                </IconContext.Provider>
                                <span className="text-white text-shadow-md py-2 text-sm font-bold mr-2">
                                    Valor atual
                                </span>
                            </button>
                        </STh>
                        <STh classname={`w-56 ${headerClass.default}`}>
                            <button
                                type="button"
                                onClick={() => requestSort('giroFilial')}
                                className={`${getClassNamesFor('giroFilial')} flex items-center justify-start`}
                            >
                                <IconContext.Provider value={{ className: "" }}>
                                    <div>
                                        <TiArrowUnsorted size={14} />
                                    </div>
                                </IconContext.Provider>
                                <span className="white text-shadow-md py-2 text-sm font-bold mr-2">
                                    Giro filial
                                </span>
                            </button>
                        </STh>
                        <STh classname={`w-56 ${headerClass.default} text-left`}>
                            <span className="white text-shadow-md px-2 py-2 text-sm font-bold">
                                Giro rede
                            </span>
                        </STh>
                    </STr>
                </thead>
                <tbody>
                    {displayGiros}
                </tbody>
            </STable>
            <div className="mt-3">
                {pageCount > 1 &&
                    <ReactPaginate
                        previousLabel={<IoArrowBack size={17} />}
                        nextLabel={<IoArrowForward size={17} />}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName="flex items-center justify-center"
                        previousLinkClassName="flex items-center justify-center mr-1 w-11 h-11 !text-sm text-gray-500 bg-gray-100 !border-2 !border-white shadow"
                        nextLinkClassName="flex items-center justify-center ml-1 w-11 h-11 !text-sm text-gray-500 bg-gray-100 !border-2 !border-white shadow"
                        disabledClassName="flex items-center justify-center w-11 h-11 !text-sm text-gray-100 cursor-not-allowed bg-white"
                        // pageClassName="border flex items-center justify-center bg-gray-200 mx-1"
                        pageLinkClassName="mx-1 flex items-center justify-center w-11 h-11 !text-sm text-gray-500 bg-gray-100 !border-2 !border-white shadow"
                        // activeClassName="border-0 flex items-center text-gray-50 bg-blue-500"
                        activeLinkClassName="flex items-center justify-center w-11 h-11 !text-sm !text-gray-50 font-bold !bg-blue-500 !border-2 !border-white shadow"
                    />
                }
            </div>
        </Fragment>
    );
};
