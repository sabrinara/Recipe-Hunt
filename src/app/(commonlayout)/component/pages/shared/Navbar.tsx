"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { CookingPot  } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
export default function NavBar() {
  const routeMap: Record<string, string> = {
    user: "/dashboard",
    admin: "/dashboard/admin",
    driver: "/dashboard/user",
  };

  return (
    <Navbar maxWidth="2xl">
      <NavbarBrand>
        <Link className="flex" href="/">
        <CookingPot className="text-red-500 text-3xl"/>
          <p className="font-bold text-inherit px-4 text-red-500 text-2xl">Recipe Hunt</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4 text-xl text-red-500 font-bold" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/allrecipies">
            Recipes
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link href="/about" aria-current="page">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          {/* {user && <Link href={routeMap[user?.role]}>Dashboard</Link>} */}
          <Link href={routeMap.user}>Dashboard</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>

        {/* {user ? (
          <NavbarItem>
            <Button onClick={logOutUser} color="primary" variant="flat">
              Logout
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
        )} */}
      </NavbarContent>
    </Navbar>
  );
}