"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

import { Home, LogIn, LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";

import { LoginMemberContext, useLoginMember } from "@/stores/auth/loginMember";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import client from "@/lib/backend/client";

function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">테마</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ClientLayout({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) {
  const router = useRouter();

  const {
    setLoginMember,
    isLogin,
    loginMember,
    removeLoginMember,
    isLoginMemberPending,
    isAdmin,
    setNoLoginMember,
  } = useLoginMember();

  const loginMemberContextValue = {
    loginMember,
    setLoginMember,
    removeLoginMember,
    isLogin,
    isLoginMemberPending,
    isAdmin,
    setNoLoginMember,
  };

  useEffect(() => {
    client.GET("/api/v1/members/me").then((res) => {
      if (res.error) {
        setNoLoginMember();
      } else {
        setLoginMember(res.data);
      }
    });
  }, []);

  if (isLoginMemberPending) {
    return (
      <div className="flex-1 flex justify-center items-center text-muted-foreground">
        인증 정보 로딩중...
      </div>
    );
  }

  const logout = () => {
    client.DELETE("/api/v1/members/logout").then((res) => {
      removeLoginMember();
      router.replace("/");
    });
  };

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LoginMemberContext value={loginMemberContextValue}>
        <header className="flex p-2">
          <Button variant="link" asChild>
            <Link href="/">
              <Home /> 홈
            </Link>
          </Button>
          {isAdmin && (
            <Button variant="link" asChild>
              <Link href="/adm">
                <Settings /> 관리자
              </Link>
            </Button>
          )}
          {isLogin && (
            <Button variant="link" asChild>
              <Link href="/member/me">
                <User /> {loginMember.nickname}
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={loginMember.profileImgUrl}
                />
              </Link>
            </Button>
          )}
          {isLogin && (
            <Button variant="link" onClick={logout}>
              <LogOut /> 로그아웃
            </Button>
          )}
          {!isLogin && (
            <Button variant="link" asChild>
              <Link href="/adm/member/login">
                <LogIn /> 관리자 로그인
              </Link>
            </Button>
          )}
          <div className="flex-grow"></div>
          <ModeToggle />
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="p-2 flex justify-center">
          <span>© 2025 글로그</span>
        </footer>
      </LoginMemberContext>
    </NextThemesProvider>
  );
}
