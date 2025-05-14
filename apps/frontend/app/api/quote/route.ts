import { NextResponse } from "next/server";

interface ZenQuote {
  q: string;
  a: string;
}

export async function GET() {
  try {
    const res = await fetch("https://zenquotes.io/api/random");
    const data = (await res.json()) as ZenQuote[];
    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch quote" },
      { status: 500 },
    );
  }
}
