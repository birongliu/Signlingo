"use client";

import Link from "next/link";

interface SidebarProps {
  items: { href: string; label: string; icon: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <aside className="hidden w-64 bg-lime-300 p-6 md:block">
      <nav className="mt-16 space-y-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block text-lg font-bold text-gray-800 transition-all duration-300 hover:scale-105 hover:text-lime-600"
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
