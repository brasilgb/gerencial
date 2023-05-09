'use client';

import React, { useContext } from "react";
import AppLayout from "@/layouts";
import './globals.css';
import { usePathname } from "next/navigation";
import { checkIsPublicRoute } from "@/function/check-is-public-route";
import { AuthProvider } from "@/contexts/auth";
import PrivateRoute from "@/components/PrivateRoute";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname();

  const isPublicPage = checkIsPublicRoute(pathname!);

  return (
    <html lang="en">
      <head>
        <title>Grupo Solar - Aplicação Gerencial</title>
      </head>
      <body>
        <AuthProvider>
          {isPublicPage && children}
          {!isPublicPage &&
            <PrivateRoute>
              <AppLayout>
                {children}
              </AppLayout>
            </PrivateRoute>
          }
        </AuthProvider>
      </body>
    </html>
  )
}
