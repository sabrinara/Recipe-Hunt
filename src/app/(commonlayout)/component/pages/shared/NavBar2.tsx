"use client";

import {
  Avatar,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function NavBar2() {
  const [userData, setUserData] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  const routeMap: Record<string, string> = {
    user: "/dashboard",
    admin: "/admin",
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");
      setUserData(user);
      setUserToken(token);
    }
  }, []);

  const handleClearStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUserData(null);
    setUserToken(null);
  };

  let parsedUser = null;
  try {
    parsedUser = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Invalid user data:", error);
  }

  const user = parsedUser;
  const userRole = user?.role || "user";

  const isLoggedIn = Boolean(userData && userToken);

  const items = isLoggedIn
    ? [
      { key: "home", label: "Home", href: "/" },
      { key: "recipes", label: "Recipes", href: "/recipe" },
      { key: "about", label: "About", href: "/about" },
      { key: "contact", label: "Contact", href: "/contact" },
      { key: "profile", label: "My Profile", href: "/profile" },
      {
        key: "dashboard",
        label: "Dashboard",
        href: routeMap[userRole],
      },
      {
        key: "logout",
        label: "Logout",
        href: "#",
        action: () => {
          signOut();
          handleClearStorage();
        },
      },
    ]
    : [
      { key: "home", label: "Home", href: "/" },
      { key: "recipes", label: "Recipes", href: "/recipe" },
      { key: "about", label: "About", href: "/about" },
      { key: "contact", label: "Contact", href: "/contact" },
      { key: "login", label: "Login", href: "/login" },
      { key: "register", label: "Register", href: "/register" },
    ];

  return (
    <Navbar
      maxWidth="full"
      className="flex flex-col items-center justify-between bg-white dark:bg-[#1b1a1a]"
    >
      <NavbarBrand>
        <Link className="flex" href="/">
          <Image
            src="/assets/navlogo.png"
            alt="nav logo"
            className="w-40 md:w-60 h-12 md:h-[70px]"
          />
        </Link>
      </NavbarBrand>

      <NavbarContent
        className="hidden md:flex gap-6 text-[#E10101] font-bold"
        justify="center"
      >
        <NavbarItem>
          <Link href="/" className="md:text-lg font-serif">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/recipe" className="md:text-lg font-serif">
            Recipes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/about" className="md:text-lg font-serif">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/contact" className="md:text-lg font-serif">
            Contact
          </Link>
        </NavbarItem>

        {isLoggedIn ? (
          <>
            {/* <NavbarItem>
              <Link href="/profile" className="md:text-lg font-serif">
                Profile
              </Link>
            </NavbarItem> */}
            <NavbarItem>
              <Link
                href={routeMap[userRole]}
                className="md:text-lg font-serif"
              >
                Dashboard
              </Link>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link href="/login" className="md:text-lg font-serif">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register" className="md:text-lg font-serif">
                Register
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarContent justify="end" className="flex items-center gap-4">
        {/* Small Device Dropdown */}
        <NavbarItem className="flex md:hidden">
          <Dropdown>
            <DropdownTrigger>
              <button className="focus:outline-none">
                <Avatar
                  src={user?.imageUrl || "/default-avatar.png"}
                  name={user?.name || "User"}
                  title={user?.name || "User"}
                  size="sm"
                  isBordered
                />
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Menu" className="bg-transparent">
              
              {items.map((item) =>
                item.key === "logout" ? (
                  <DropdownItem key={item.key} color="danger" onClick={item.action}>
                    {item.label}
                  </DropdownItem>
                ) : (
                  <DropdownItem key={item.key}>
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

        {/* Desktop Avatar with dropdown for logged-in user */}
        {isLoggedIn && (
          <NavbarItem className="hidden md:flex">
            <Dropdown>
              <DropdownTrigger>
                <button className="focus:outline-none">
                  <Avatar
                    src={user?.imageUrl || "/default-avatar.png"}
                    name={user?.name || "User"}
                    title={user?.name || "User"}
                    size="md"
                    isBordered
                  />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User Menu" className="bg-transparent">
                <DropdownItem key="profile" className="ml-2 h-14 gap-2">
                  {/* <p className="font-semibold">Signed in as</p> */}
                  <p className="font-semibold truncate text-lg">{user?.name || "No Name"}</p>
                  <p className="font-semibold truncate">{user?.email || "No Email"}</p>
                </DropdownItem>
                <DropdownItem key={""}>
                  <Link href="/profile" className=" p-2">My Profile</Link>
                </DropdownItem>
                <DropdownItem key={""}>
                  <button
                    onClick={() => {
                      signOut();
                      handleClearStorage();
                    }}
                    className="hover:bg-[#E10101] hover:rounded-md w-full text-left p-2"
                  >
                    Logout
                  </button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
