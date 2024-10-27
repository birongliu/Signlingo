import { Button } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex h-full w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-2 p-4 lg:flex-row">
      <div className="relative mb-8 h-[240px] w-[240px] lg:mb-0 lg:h-[424px] lg:w-[424px]">
        <Image src="/hero.svg" alt="Hero" fill />
      </div>

      <div className="flex flex-col items-center gap-y-8">
        <h1 className="max-w-[480px] text-center text-xl font-medium text-neutral-600 lg:text-3xl">
          Learn, practice and master sign language with SignLingo.
        </h1>

        <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3">
          <div className="flex flex-col items-center gap-2">
            <Link className="w-full" href="/signup">
              <button className="bg-mask-green hover:bg-feather-green mt-4 w-full rounded px-4 py-2 font-medium text-white transition-all duration-300 hover:scale-105">
                Get Started
              </button>
            </Link>
            <a
              href="/login"
              className="font-bold hover:cursor-pointer hover:underline"
            >
              Already have an account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
