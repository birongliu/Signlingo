import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-full justify-center flex-col lg:flex-row items-center  gap-2 py-20 bg-lime-300">
      <Image
        src="/logo.svg"
        alt="Create Next App Logo"
        width={300}
        height={300}
        className="border"
      />
      <div className="flex flex-col px-3">
        <h1 className="text-2xl lg:text-4xl font-bold lg:text-start text-center">
          Learn, practice and master sign language
        </h1>
        <p className="text-wrap text-xl lg:text-center font-semibold text-center">
          through personalized Artifical Intelligence Assistants
        </p>
        <div className="flex flex-col items-center gap-2">
          <Link className="w-full" href="/signup">
            <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Get Started
            </button>
          </Link>
          <a href="/login" className="font-bold hover:cursor-pointer">
            Already had a account?
          </a>
        </div>
      </div>
    </main>
  );
}
