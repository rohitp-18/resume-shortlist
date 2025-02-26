import pinecone from "@/lib/pinecone";
import { getEmbedding } from "@/lib/text-embedding";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, text, id } = await req.json();

    const vector: number[] = (await getEmbedding(text)) as unknown as number[];

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

    // Upsert data (store or update)
    await index.upsert([
      {
        id,
        values: vector,
        metadata: { type: "resume", email, name, text, company },
      },
    ]);

    return NextResponse.json(
      { message: "Data stored successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500 }
    );
  }
}
