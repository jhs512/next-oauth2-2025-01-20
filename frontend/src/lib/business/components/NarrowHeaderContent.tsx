"use client";

import { Button } from "@/components/ui/button";
import { LoginMemberContext } from "@/stores/auth/loginMember";
import { Home, Menu, Triangle } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import MeMenuButton from "./MeMenuButton";
import ThemeToggleButton from "./ThemeToggleButton";
import Logo from "./Logo";

export default function NarrowHeaderContent({
  className,
}: {
  className?: string;
}) {
  const { isLogin } = use(LoginMemberContext);

  return (
    <div className={`${className} py-1`}>
      <Button variant="link">
        <Menu />
      </Button>
      <Button variant="link" asChild>
        <Logo />
      </Button>
      <div className="flex-grow"></div>
      {isLogin && <MeMenuButton />}
      <ThemeToggleButton />
    </div>
  );
}