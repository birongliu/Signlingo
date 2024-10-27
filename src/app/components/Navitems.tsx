"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/app/utils/supabase/client";
import Link from "next/link";

import { signout } from "../lib/auth-action";
import { Button } from "./ui/button";

const NavItems = () => {
  const [user, setUser] = useState<{ id: string} | null>(null);
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
      <div className="flex gap-3">
        <Link
          className="block text-sm font-medium text-black transition-all duration-300 hover:scale-105"
          href="/progress"
        >
          <Button className="bg-feather-green">Progress</Button>
        </Link>
        <Button
          onClick={() => {
            signout();
            setUser(null);
          }}
          className="block text-sm font-medium text-white transition-all duration-300 hover:scale-105"
        >
          Logout
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex gap-3">
        <Link
          href="/login"
          className="rounded-full text-sm font-medium text-black transition-all duration-300 hover:scale-110"
        >
          <Button className="bg-feather-green"> Login</Button>
        </Link>
        <Link
          href="/signup"
          className="text-lg font-bold text-black transition-all duration-300 hover:scale-110"
        >
          <Button className=""> Register</Button>
        </Link>
      </div>
    );
  }
};
export default NavItems;
