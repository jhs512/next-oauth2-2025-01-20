"use client";

import * as React from "react";
import { useEffect } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import Link from "next/link";

import client from "@/lib/backend/client";

import NarrowHeaderContent from "@/lib/business/components/NarrowHeaderContent";
import WideHeaderContent from "@/lib/business/components/WideHeaderContent";

import { LoginMemberContext, useLoginMember } from "@/stores/auth/loginMember";

import { Button } from "@/components/ui/button";

import { Copyright, LogIn } from "lucide-react";

export function ClientLayout({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) {
  const {
    isLoginMemberPending,
    setNoLoginMember,
    loginMember,
    setLoginMember,
    logout,
    isLogin,
    isAdmin,
  } = useLoginMember();

  const loginMemberContextValue = {
    isLoginMemberPending,
    setNoLoginMember,
    loginMember,
    setLoginMember,
    logout,
    isLogin,
    isAdmin,
  };

  useEffect(() => {
    const fetchMember = () => {
      client.GET("/api/v1/members/me").then((res) => {
        if (res.error) {
          setNoLoginMember();
        } else {
          setLoginMember(res.data);
        }
      });
    };

    fetchMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoginMemberPending) {
    return (
      <div className="flex-1 flex justify-center items-center text-muted-foreground">
        인증 정보 로딩중...
      </div>
    );
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LoginMemberContext value={loginMemberContextValue}>
        <header>
          <NarrowHeaderContent className="flex lg:hidden" />
          <WideHeaderContent className="hidden lg:flex" />
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="p-2 flex justify-center">
          <Button variant="link" asChild>
            <Link href="/">
              <Copyright /> 2025 글로그
            </Link>
          </Button>
          {!isLogin && (
            <Button variant="link" asChild>
              <Link href="/adm/member/login">
                <LogIn /> 관리자 로그인
              </Link>
            </Button>
          )}
        </footer>
      </LoginMemberContext>
    </NextThemesProvider>
  );
}
