"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { signout } from "../lib/auth-action";

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
  
  if (user !== null) {
    return (
      <div className="flex gap-2">
        <Link
          className="translate-colors text-lg font-bold text-gray-800 duration-300 hover:text-lime-600"
          href="/learn"
        >
          DashBoard
        </Link>
        <Button
        onClick={() => {
          signout();
          setUser(null);
        }}
      >
        Log out
      </Button>
      </div>
    );
  } else {
  return <div className="flex gap-2">
    <Link
      href="/login"
      className="text-lg font-bold text-white transition-all duration-300 hover:scale-110"
    >
      Login
    </Link>
    <Link
      href="/signup"
      className="text-lg font-bold text-white transition-all duration-300 hover:scale-110"
    >
      Sign Up
    </Link>
  </div>;
};
}
export default NavItems;
