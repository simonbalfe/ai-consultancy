import { ChevronRight, Feather } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import ThemeToggle from "../ui/theme-toggle";

interface NavbarProps {
  currentPath?: string;
}

export default function Navbar({ currentPath }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [pathname, setPathname] = useState(currentPath ?? "/");

  /* Keep pathname in sync on the client (for SPA nav, etc.) */
  useEffect(() => {
    if (!currentPath) setPathname(window.location.pathname);
  }, [currentPath]);

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  const ITEMS = [
    {
      label: "Product",
      href: "#product",
      dropdownItems: [
        {
          title: "Features",
          href: "/features",
          description:
            "Streamline is built on the habits that make the best product teams successful",
          icon: Feather,
        },
      ],
    },
    { label: "About us", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const bgColor = "bg-obsidian";

  return (
    <header
      className={cn(
        "relative z-50 h-20 border-b border-b-dark-gray px-2.5 lg:px-0",
        bgColor,
      )}
    >
      <div className="container flex h-20 items-center border-l border-r border-l-dark-gray border-r-dark-gray">
        <div className="flex w-full items-center justify-between py-3">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img
              src="/images/layout/logo.svg"
              alt="logo"
              width={129}
              height={32}
              className="invert dark:invert-0"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="flex items-center justify-center">
            <NavigationMenu className="mr-4 hidden items-center gap-8 lg:flex">
              <NavigationMenuList>
                {ITEMS.map((link) =>
                  link.dropdownItems ? (
                    <NavigationMenuItem key={link.label} className="text-sm">
                      <NavigationMenuTrigger
                        className={cn(
                          "text-foreground bg-transparent text-sm font-normal",
                          "hover:bg-transparent focus:bg-transparent active:bg-transparent",
                          "hover:text-muted-foreground focus:text-muted-foreground",
                          "data-[state=open]:bg-transparent data-[state=open]:text-muted-foreground",
                          "transition-none",
                        )}
                      >
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="rounded-md bg-obsidian">
                        <ul className="w-[400px] bg-obsidian p-3">
                          {link.dropdownItems.map((item) => (
                            <li key={item.title}>
                              <NavigationMenuLink asChild>
                                <a
                                  href={item.href}
                                  className="outline-hidden flex items-start rounded-md p-3 leading-none no-underline transition-colors hover:bg-dark-gray hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <item.icon className="text-mid-gray size-4" />

                                  <div className="ml-2 space-y-1.5">
                                    <div className="text-foreground text-sm font-medium leading-none">
                                      {item.title}
                                    </div>
                                    <p className="text-mid-gray line-clamp-2 text-sm leading-tight">
                                      {item.description}
                                    </p>
                                  </div>
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={link.label}>
                      <a
                        href={link.href}
                        className={cn(
                          "text-foreground p-2 text-sm hover:text-muted-foreground",
                          pathname === link.href && "text-muted-foreground",
                        )}
                      >
                        {link.label}
                      </a>
                    </NavigationMenuItem>
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2.5">
              <a
                href="/login"
                className={`transition-opacity duration-300 ${isMenuOpen ? "max-lg:pointer-events-none max-lg:opacity-0" : "opacity-100"}`}
              >
                <Button size="sm">Login</Button>
              </a>

              <div
                className={`transition-opacity duration-300 ${isMenuOpen ? "max-lg:pointer-events-none max-lg:opacity-0" : "opacity-100"}`}
              >
                <ThemeToggle />
              </div>

              {/* Hamburger Menu Button (Mobile Only) */}
              <button
                className="relative flex size-8 text-muted-foreground lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <div className="absolute left-1/2 top-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
                  <span
                    aria-hidden="true"
                    className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "container absolute inset-x-0 top-full flex h-[calc(100vh-80px)] flex-col border-t border-t-dark-gray px-2.5 lg:px-0",
          "transition duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0",
          bgColor,
        )}
      >
        <div className="h-[calc(100vh-80px)] border-x border-dark-gray px-5">
          <nav className="mt-6 flex flex-1 flex-col gap-6">
            {ITEMS.map((link) =>
              link.dropdownItems ? (
                <div key={link.label}>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === link.label ? null : link.label,
                      )
                    }
                    className="text-foreground flex w-full items-center justify-between text-lg tracking-[-0.36px]"
                    aria-label={`${link.label} menu`}
                    aria-expanded={openDropdown === link.label}
                  >
                    {link.label}
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openDropdown === link.label && "rotate-90",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={cn(
                      "ml-1 space-y-3 overflow-hidden border-b border-b-dark-gray transition-all",
                      openDropdown === link.label
                        ? "mt-3 max-h-[1000px] pb-6 opacity-100"
                        : "max-h-0 opacity-0",
                    )}
                  >
                    {link.dropdownItems.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                        className="flex items-start gap-3 rounded-md p-2 hover:bg-accent"
                      >
                        <item.icon className="text-mid-gray size-6 shrink-0" />
                        <div>
                          <div className="text-foreground font-medium">
                            {item.title}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-foreground text-lg tracking-[-0.36px]",
                    pathname === link.href && "text-muted-foreground",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export { Navbar };
