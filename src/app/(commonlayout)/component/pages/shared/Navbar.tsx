"use client";

import {
  Button,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { TfiMenuAlt } from "react-icons/tfi";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
type Session = {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  },
  token?: string |null |undefined;
}
export default function NavBar({ session }: { session: Session | null }) {
  const [userData, setUserData] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const routeMap: Record<string, string> = {
    user: "/dashboard",
    admin: "/dashboard/admin",
    recipeWriter: "/dashboard/user",
  };

  useEffect(() => {
    if (session) {
      localStorage.setItem("user", JSON.stringify(session.user));
      if (session?.token) {
        localStorage.setItem("accessToken", session?.token);
      }
    }
  }, [session]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("accessToken") ;
      const user = localStorage.getItem("user");
      setUserData(user);
      setUserToken(token);
      // console.log("token",token);
      // console.log("user", user)

    }
  }, []);
  console.log("usertoken", userToken);
  console.log("userData", userData);//ok for google

  const handleClearStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUserData(null);
    setUserToken(null)
  }
  const isLoggedIn = Boolean(session?.user || (userData && userToken));
  const items = isLoggedIn
  ? [
      { key: "recipes", label: "Recipes", href: "/allrecipies" },
      { key: "about", label: "About", href: "/about" },
      { key: "dashboard", label: "Dashboard", href: routeMap.user },
      { key: "logout", label: "Logout", href: "#", action: () => { signOut(); handleClearStorage(); } }
    ]
  : [
      { key: "recipes", label: "Recipes", href: "/allrecipies" },
      { key: "about", label: "About", href: "/about" },
      { key: "login", label: "Login", href: "/login" },
      { key: "register", label: "Register", href: "/register" }
    ];
  return (

    <Navbar maxWidth="full" className="flex flex-col items-center justify-between bg-white dark:bg-[#1b1a1a]">
      <NavbarBrand>
        <Link className="flex" href="/">
          {/* <CookingPot className="text-[#E10101] text-3xl"/> */}
          {/* <p className="font-bold text-inherit px-4 text-[#E10101] text-2xl">Recipe Hunt</p> */}
          <Image src="/assets/navlogo.png" alt="nav logo" className="w-40 md:w-60 h-12 md:h-[70px] " />
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden md:flex gap-6 text-[#E10101] font-bold" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/allrecipies" className="md:text-lg font-serif">
            Recipes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/about" aria-current="page" className="md:text-lg font-serif">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={routeMap.user} className="md:text-lg font-serif">Dashboard</Link>
        </NavbarItem>
        {isLoggedIn ? (
          <NavbarItem>
            <button onClick={() => { signOut(); handleClearStorage(); }} className="md:text-lg font-serif">Logout</button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <Link href="/login" aria-current="page" className="md:text-lg font-serif">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register" aria-current="page" className="md:text-lg font-serif">
                Register
              </Link>
            </NavbarItem>
          </>
        )
        }

      </NavbarContent>
      <NavbarContent justify="end" className="flex items-center">
        <NavbarItem className="flex md:hidden">
          <Dropdown  >
            <DropdownTrigger>
              <Button className="text-[#E10101] bg-transparent text-2xl ">
                <TfiMenuAlt />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" className="bg-transparent">
  {items.map((item) =>
    item.key === "logout" ? (
      <DropdownItem key={item.key} color="danger" onClick={item.action}>
        {item.label}
      </DropdownItem>
    ) : (
      <DropdownItem key={item.key} color="default">
        <Link href={item.href}>{item.label}</Link>
      </DropdownItem>
    )
  )}
</DropdownMenu>

          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
