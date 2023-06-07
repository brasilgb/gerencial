'use client';

import React, { useEffect, useState } from "react";
import AppLayout from "@/layouts";
import './globals.css';
import { usePathname } from "next/navigation";
import { checkIsPublicRoute } from "@/function/check-is-public-route";
import { AuthProvider } from "@/contexts/auth";
import PrivateRoute from "@/components/PrivateRoute";
import SessionTimeout from "@/components/SessionTimeOut";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname();

  const isPublicPage = checkIsPublicRoute(pathname!);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true)
  }, [])

  return (
    <html lang="en">
      <body>

        <AuthProvider>
          {isPublicPage && children}

          {mounted && !isPublicPage &&
            <PrivateRoute>
              <AppLayout>
                {children}
              </AppLayout>
              <SessionTimeout />
            </PrivateRoute>
          }
        </AuthProvider>          
 
      </body>
    </html>
  )
}
