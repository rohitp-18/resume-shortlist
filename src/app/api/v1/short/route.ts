"use server";

import pinecone from "@/lib/pinecone";
import { getEmbedding } from "@/lib/text-embedding";
import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { description, company } = await req.json();

    const vector: number[] = (await getEmbedding(
      description
    )) as unknown as number[];

    if (
      !Array.isArray(vector) ||
      !vector.every((num) => typeof num === "number")
    ) {
      return NextResponse.json(
        { errod: "Invalid embedding format. Expected an array of numbers." },
        { status: 400 }
      );
    }

    const index = pinecone.Index("resume");

    // result = index.query(vector=vector, topK=3, include_metadata=True)
    let result = await index.query({
      vector: vector,
      topK: 30,
      includeMetadata: true,
      filter: { type: "resume", company: company },
    });

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Error querying Pinecone:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}
