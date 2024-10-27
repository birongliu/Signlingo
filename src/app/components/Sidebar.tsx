"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarProps {
  items: { href: string; label: string; icon: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const router = useRouter();
  const [url, setUrl] = useState<any>(null);

  useEffect(() => {
    setUrl(window.location.pathname);
  }, []);

  return (
    <aside className="hidden w-64 border-r bg-white p-6 md:block">
      <nav className="mt-16 space-y-6">
        {items.map((item) => {
          console.log(item.href);
          console.log(url);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex gap-8 text-lg font-bold text-black transition-all duration-300 hover:scale-105 ${item.href == url && "bg-black"}`}
            >
              {item.icon} {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
