import Link from "next/link";

export default function Intro() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-400 to-neutral text-white/90 flex flex-col">
      <header className="w-full flex justify-between items-center p-6">
        <div className="text-lg sm:text-xl font-bold">BetterSelf</div>
        <div className="space-x-4">
          <Link href="/sign-in">
            <button className="bg-white/90 text-sm md:text-md text-violet-600 px-4 py-2 rounded-xl font-semibold shadow hover:bg-gray-100 transition">
              Sign In
            </button>
          </Link>
          <Link href="/login">
            <button className="border text-sm md:text-md border-white/90 px-4 py-2 rounded-xl font-semibold hover:bg-white/90 hover:text-violet-600 transition">
              Log In
            </button>
          </Link>
        </div>
      </header>

      <div className="flex-grow flex flex-col justify-center items-center text-center px-4 mx-5">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-gravitas font-extrabold mb-4 drop-shadow-lg">
          Rise. Grow. Achieve
        </h1>
        <p className="text-lg md:text-2xl text-white/90">
          Your best life isn&apos;t a dream — it&apos;s a plan. Let&apos;s make
          it happen, together
        </p>
      </div>
    </main>
  );
}
