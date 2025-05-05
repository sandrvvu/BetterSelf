"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        Category not found
      </h1>
      <p className="text-gray-500 mb-6">
        The category you&apos;re looking for doesn&apos;t exist or has been
        removed.
      </p>
      <Link
        href="/home/categories"
        className="text-purple-600 border border-purple-600 px-4 py-2 rounded hover:bg-purple-50 transition"
      >
        Back to Categories
      </Link>
    </div>
  );
}
