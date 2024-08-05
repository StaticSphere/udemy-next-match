"use client";

import useMessageStore from "@/app/hooks/useMessageStore";
import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: Props) {
  const path = usePathname();
  const { unreadCount } = useMessageStore((store) => ({
    unreadCount: store.unreadCount,
  }));

  return (
    <NavbarItem as={Link} href={href} isActive={path === href}>
      <span>{label}</span>
      {href === "/messages" && <span className="ml-1">({unreadCount})</span>}
    </NavbarItem>
  );
}
