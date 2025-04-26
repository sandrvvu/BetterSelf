import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-800 via-violet-400 to-neutral text-white/90 flex flex-col">
      <div className="flex-grow flex flex-col justify-center items-center text-center mx-6 px-5">
        <h1 className="text-[5rem] md:text-[7rem] font-gravitas font-extrabold mb-4 drop-shadow-lg">
          404
        </h1>
        <p className="text-lg md:text-4xl font-semibold">
          Oops! Nothing Found Here
        </p>
        <p className="text-sm md:text-xl">
          We&apos;re sorry, but the page you were looking for could not be
          found.
        </p>
        <Link href="/">
          <button className="border-2 border-white text-md md:text-xl my-10 px-4 py-2 rounded-xl hover:bg-white/90 hover:text-indigo-800 transition">
            Go back to the homepage
          </button>
        </Link>
      </div>
    </main>
  );
}
