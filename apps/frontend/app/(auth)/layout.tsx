import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2">
      <div className="relative hidden md:block bg-gradient-to-r from-violet-800 to-pink-400">
        <Link
          href="/"
          className="absolute top-8 left-6 text-white/90 flex items-center"
        >
          <FaLongArrowAltLeft />
          <p className="ml-2 text-lg">Back</p>
        </Link>
      </div>

      <div className="block md:hidden px-4 pt-6">
        <Link href="/" className="text-violet-800 flex items-center mb-4">
          <FaLongArrowAltLeft />
          <p className="ml-2 text-lg">Back</p>
        </Link>
      </div>

      <div className="flex items-center justify-center px-6 py-6 sm:py-12 bg-white/90">
        <div className="w-full max-w-md sm:max-w-lg">{children}</div>
      </div>
    </div>
  );
}
