import pinecone from "@/lib/pinecone";
import { getEmbedding } from "@/lib/text-embedding";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      company,
      location,
      salary,
      skills,
      about,
      perks,
      description,
      id,
    } = await req.json();

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

    // Upsert data (store or update)
    await index.upsert([
      {
        id,
        values: vector,
        metadata: {
          type: "job",
          description,
          name,
          company,
          location,
          salary,
          skills,
          about,
          perks,
        },
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
