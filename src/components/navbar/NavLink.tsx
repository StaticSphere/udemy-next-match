"use client";

import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: Props) {
  const path = usePathname();

  return (
    <NavbarItem as={Link} href={href} isActive={path === href}>
      {label}
    </NavbarItem>
  );
}
