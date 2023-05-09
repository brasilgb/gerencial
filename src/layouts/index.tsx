"use client"

import React, { Fragment } from 'react'
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
    children: React.ReactNode;
}

const AppLayout = ({ children }: LayoutProps) => {
    return (
        <Fragment>
            <div className="flex flex-col min-h-screen bg-solar-gray-dark overflow-x-auto font-poppins antialiased">
                <Header />
                <div className="flex-grow">
                    {children}
                </div>
                <Footer />
            </div>
        </Fragment>
    )
}

export default AppLayout;