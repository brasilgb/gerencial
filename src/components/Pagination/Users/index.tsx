"use client"

import React, { Fragment, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { STable, STd, STh, STr } from '../../Tables';
import moment from 'moment';
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

export const Pagination = ({ data }: any) => {

    const [users, setUsers] = useState(data.slice(0, 10000));

    useEffect(() => {
        setUsers(data.slice(0, 10000));
    }, [data])

    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 15;
    const pagesVisited = pageNumber * usersPerPage;
    const displayUsers = users
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((user: any, index: any) => {
            return (
                <STr key={index} colorRow={(index % 2)}>
                    <STd>{user.IdUsuario}</STd>
                    <STd>{user.usuario.Name}</STd>
                    <STd>{user.usuario.Code}</STd>
                    <STd>{user.Ip}</STd>
                    <STd>{moment(user.usuario.created_at).format('DD/MM/YYYY HH:mm:ss')}</STd>
                    <STd>{moment(user.created_at).format('DD/MM/YYYY HH:mm:ss')}</STd>
                </STr>
            );
        });

    const pageCount = Math.ceil(users.length / usersPerPage);
    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };

    const headerClass = {
        default: "text-left border-r border-t text-xs font-semibold bg-solar-blue-light !text-white",
    }
    
    return (
        <Fragment>
            <STable>
                <STr thead={true}>
                    <STh classname={`${headerClass.default}`}>
                        Id Usuário
                    </STh>
                    <STh classname={`${headerClass.default}`}>
                        Nome Usuário
                    </STh>
                    <STh classname={`${headerClass.default}`}>
                        Código Vendedor
                    </STh>
                    <STh classname={`${headerClass.default}`}>
                        IP
                    </STh>
                    <STh classname={`${headerClass.default}`}>
                        Data Cadastro
                    </STh>
                    <STh classname={`${headerClass.default}`}>
                        Data Acesso
                    </STh>
                </STr>
                {displayUsers}
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
