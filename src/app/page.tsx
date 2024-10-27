import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2 py-20 lg:flex-row">
      <Image
        src="/logo.svg"
        alt="Create Next App Logo"
        width={300}
        height={300}
        className="border"
      />
      <div className="flex flex-col px-3">
        <h1 className="text-center text-2xl font-bold lg:text-start lg:text-4xl">
          Learn, practice and master sign language
        </h1>
        <p className="text-wrap text-center text-xl font-semibold lg:text-center">
          through personalized Artifical Intelligence Assistants
        </p>
        <div className="flex flex-col items-center gap-2">
          <Link className="w-full" href="/signup">
            <button className="bg-mask-green hover:bg-feather-green mt-4 w-full rounded px-4 py-2 font-bold text-white transition-all duration-300 hover:scale-105">
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
    </main>
  );
}
