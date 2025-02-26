import { Pinecone } from "@pinecone-database/pinecone";
import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import formidable from "formidable";
import fs from "fs/promises";
import pinecone from "@/lib/pinecone";

// Initialize Pinecone client

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET() {
  try {
    // Example: Fetching data from Pinecone
    const index = pinecone.Index("resume");

    const result = await index.query({
      vector: Array(1024).fill(0),
      topK: 30,
      includeMetadata: true,
      filter: { type: "job" },
    });

    return NextResponse.json(result.matches, { status: 200 });
  } catch (error) {
    console.error("Error querying Pinecone:", error);
    return NextResponse.json(
      { message: "Error querying Pinecone" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const arrayBuffer = await req.arrayBuffer(); // Read file as binary
    const pdfBuffer = Buffer.from(arrayBuffer); // Convert to buffer

    const data = await pdfParse(pdfBuffer); // Parse PDF

    return NextResponse.json({ text: data.text }, { status: 200 });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    return NextResponse.json({ message: "Error parsing PDF" }, { status: 500 });
  }
}
