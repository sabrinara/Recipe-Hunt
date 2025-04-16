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
// import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaBookBookmark, FaSquarePhone } from "react-icons/fa6";
import { TbLogin, TbLogin2 } from "react-icons/tb";
import { IoMdContact } from "react-icons/io";
import { RiDashboardFill} from "react-icons/ri";
import { GrContactInfo } from "react-icons/gr";
import { FiAlignRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function NavBar2() {
  const route = useRouter();
  const [userData, setUserData] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  const routeMap: Record<string, string> = {
    user: "/dashboard",
    admin: "/admin",
  };

  const updateUserData = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");
      setUserData(user);
      setUserToken(token);
    }
  };

  useEffect(() => {
    const handleAuthChange = () => {
      updateUserData();
    };

    window.addEventListener("authChange", handleAuthChange);

    updateUserData();

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);


  const handleClearStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUserData(null);
    setUserToken(null);
    window.dispatchEvent(new Event("authChange"));
    route.push("/")
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
      { key: "home", icon: <FaHome />, label: "Home", href: "/" },
      { key: "recipes", icon: <IoFastFoodSharp />, label: "Recipes", href: "/recipe" },
      { key: "about", icon: <FaBookBookmark />, label: "About", href: "/about" },
      { key: "contact", icon: <FaSquarePhone />, label: "Contact", href: "/contact" },
      { key: "profile", icon: <IoMdContact />, label: "My Profile", href: "/profile" },
      {
        key: "dashboard",
        icon: <RiDashboardFill />,
        label: "Dashboard",
        href: routeMap[userRole],
      },
      {
        key: "logout",
        label: "Logout",
        icon: <TbLogin />,
        href: "#",
        action: () => {
          handleClearStorage();
        },
      },
    ]
    : [
      { key: "home", icon: <FaHome />, label: "Home", href: "/" },
      { key: "recipes", icon: <IoFastFoodSharp />, label: "Recipes", href: "/recipe" },
      { key: "about", icon: <FaBookBookmark />, label: "About", href: "/about" },
      { key: "contact", icon: <FaSquarePhone />, label: "Contact", href: "/contact" },
      { key: "login", icon: <TbLogin2 />, label: "Login", href: "/login" },
      { key: "register", icon: <GrContactInfo />, label: "Register", href: "/register" },
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
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>

        <NavbarItem className="flex md:hidden">
          <Dropdown placement="bottom-end" className="bg-white dark:bg-[#1b1a1a]">
            <DropdownTrigger>
             <DropdownTrigger>
                    {user ? <button className="focus:outline-none">
                      <Avatar
                        src={user?.imageUrl || "/default-avatar.png"}
                        name={user?.name || "User"}
                        title={user?.name || "User"}
                        size="sm"
                        isBordered
                      />
                    </button> :
                      <button className="text-lg font-semibold text-[#E10101]">
                        <FiAlignRight className="text-xl" />
                      </button>
                    }
                  </DropdownTrigger>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Menu" className="bg-transparent">
              {items.map((item) =>
                item.key === "logout" ? (
                  <DropdownItem key={item.key} onClick={item.action}>
                    <div className="flex justify-start items-center gap-1">
                      {item.icon && <span className="text-lg text-[#E10101]">{item.icon}</span>} 
                      {item.label}
                    </div>
                  </DropdownItem>
                ) : (
                  <DropdownItem key={item.key}>
                    <div className="flex justify-start items-center gap-1">
                      {item.icon && <span className="text-lg text-[#E10101]">{item.icon}</span>} 
                      <Link href={item.href}>{item.label}</Link>
                    </div>
                  </DropdownItem>
                )
              )}
            </DropdownMenu>

          </Dropdown>
        </NavbarItem>

        {isLoggedIn && (
          <NavbarItem className="hidden md:flex">
            <Dropdown className="mr-0" >
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
              <DropdownMenu aria-label="User Menu" className="bg-transparent ">
                <DropdownItem key="profile" className="p-4 h-14 gap-2">
                  <p className="font-semibold truncate text-lg">{user?.name || "No Name"}</p>
                  <p className="font-semibold truncate">{user?.email || "No Email"}</p>
                </DropdownItem>
                <DropdownItem key={""}>
                  <Link href="/profile" className="flex gap-2 px-2">
               
                  <IoMdContact className="text-lg text-[#E10101]" />
                  <h1 className="font-medium">My Profile</h1>
              
                  
                  </Link>
                </DropdownItem>
                <DropdownItem key={""}>
                  <button
                    onClick={() => {
                      handleClearStorage();
                    }}
                    className="px-2 flex justify-between gap-2"
                  >
                  <TbLogin className="text-lg text-[#E10101]" />
                             <h1 className="font-medium">Log Out</h1>
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
