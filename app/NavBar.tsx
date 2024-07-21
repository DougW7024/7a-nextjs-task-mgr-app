"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiCalendar } from "react-icons/hi";
import classnames from "classnames";

const NavBar = () => {
  const currrentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    // { label: "Tasks", href: "/tasks" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <HiCalendar className="flex size-8" />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              "text-zinc-900": link.href === currrentPath,
              "text-zinc-400": link.href !== currrentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
