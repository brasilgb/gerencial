"use client"

import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
    children: React.ReactNode;
}

const AppLayout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-solar-gray-dark overflow-x-auto font-poppins antialiased">
            <Header />
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default AppLayout;