"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";
import Link from "next/link";

const NavItems = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, [user]);
  if (user) {
    return (
      <div className="flex gap-2">
        <Link
          className="translate-colors text-lg font-bold text-gray-800 duration-300 hover:text-lime-600"
          href="/home"
        >
          DashBoard
        </Link>
      </div>
    );
  }
  return <div></div>;
};

export default NavItems;
