"use client";

import menu from "@config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import config from "../../config/config.json";

const Header = () => {
  const pathname = usePathname();

  // distructuring the main menu from menu object
  const { main } = menu;

  // states declaration
  const [navOpen, setNavOpen] = useState(false);

  // logo source
  const { enable, label, link } = config.nav_button;

  return (
    <header className="header m-0 w-screen bg-white">
      <div className="container mx-auto relative flex justify-between items-center">
        {/* navbar toggler */}
        <div className="md:hidden">
          <button
            id="show-button"
            className="flex cursor-pointer items-center"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? (
              <svg className="h-6 fill-current" viewBox="0 0 20 20">
                <title>Menu Open</title>
                <polygon
                  points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                  transform="rotate(45 10 10)"
                />
              </svg>
            ) : (
              <svg className="h-6 fill-current" viewBox="0 0 20 20">
                <title>Menu Close</title>
                <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu - centered in desktop view */}
        <nav className="navbar flex-1 flex justify-center">
          <div
            id="nav-menu"
            className={`md:flex md:justify-center ${
              navOpen ? "block" : "hidden md:block"
            }`}
          >
            <ul className="navbar-nav block w-full md:flex md:w-auto lg:space-x-2">
              {main.map((menu, i) => (
                <React.Fragment key={`menu-${i}`}>
                  {menu.hasChildren ? (
                    <li className="nav-item nav-dropdown group relative">
                      <span className="nav-link inline-flex items-center">
                        {menu.name}
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </span>
                      <ul className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                        {menu.children.map((child, i) => (
                          <li className="nav-dropdown-item" key={`children-${i}`}>
                            <Link
                              href={child.url}
                              className="nav-dropdown-link block"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link
                        href={menu.url}
                        onClick={() => setNavOpen(false)}
                        className={`nav-link block ${
                          pathname === menu.url ? "nav-link-active" : ""
                        }`}
                      >
                        {menu.name}
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
              {enable && (
                <li className="md:hidden">
                  <Link
                    className="btn btn-primary z-0 py-[14px]"
                    href={link}
                    rel=""
                  >
                    {label}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
        
        {/* This empty div helps balance the hamburger menu for proper centering */}
        <div className="md:hidden"></div>
      </div>
    </header>
  );
};

export default Header;