"use client";

import Link from "next/link";

interface SidebarProps {
  selected: string;
}

const sidebarItems = [
  { href: "/learn", label: "Learn", icon: "🤓" },
  { href: "/quiz", label: "Quiz", icon: "💯" },
  { href: "/progress", label: "Progress", icon: "📈" },
  { href: "/leaderboard", label: "Leaderboard", icon: "🎯" },
];

const Sidebar: React.FC<SidebarProps> = ({ selected }) => {
  return (
    <aside className="hidden w-64 border-r bg-white p-6 md:block">
      <nav className="mt-16 space-y-6">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 text-lg font-bold transition-all duration-300 hover:scale-105 ${
              selected === item.label
                ? "rounded-md border-2 border-blue-300 bg-blue-100 py-2 text-blue-500"
                : "text-black"
            }`}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
