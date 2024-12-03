"use client";

import {
  Button,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { TfiMenuAlt } from "react-icons/tfi";
export default function NavBar() {
  const routeMap: Record<string, string> = {
    user: "/dashboard",
    admin: "/dashboard/admin",
    driver: "/dashboard/user",
  };

  // Sample items for the dropdown menu
  const items = [
    { key: "recipes", label: "Recipes", href: "/allrecipies" },
    { key: "about", label: "About", href: "/about" },
    { key: "dashboard", label: "Dashboard", href: routeMap.user },
  ];

  return (
    <Navbar maxWidth="2xl" className="flex flex-col items-center justify-between my-2">
      <NavbarBrand>
        <Link className="flex" href="/">
          {/* <CookingPot className="text-red-500 text-3xl"/> */}
          {/* <p className="font-bold text-inherit px-4 text-red-500 text-2xl">Recipe Hunt</p> */}
          <Image src="/assets/navlogo.png" alt="nav logo" className="w-44 h-12" />
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4 text-xl text-red-500 font-bold" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/allrecipies">
            Recipes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/about" aria-current="page">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/login" aria-current="page">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={routeMap.user}>Dashboard</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="hidden md:flex ">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

<div className="flex justify-end items-center md:hidden " >
   {/* Dropdown for mobile devices */}
      <Dropdown  >
        <DropdownTrigger>
          <Button className="text-red-500 bg-transparent text-2xl ">
            <TfiMenuAlt  />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" className="bg-transparent">
          {items.map((item) => (
            <DropdownItem key={item.key} color={item.key === "delete" ? "danger" : "default"}>
              <Link href={item.href}>{item.label}</Link>
            </DropdownItem>
          ))}

        </DropdownMenu>
      </Dropdown>
      <ThemeSwitcher />
</div>

     

    </Navbar>
  );
}
