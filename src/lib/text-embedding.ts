import { EmbeddingsList } from "@pinecone-database/pinecone";
import pinecone from "./pinecone";

export async function getEmbedding(text: string) {
  // Convert the text into numerical vectors that Pinecone can index
  const model = "multilingual-e5-large";

  const embeddings: EmbeddingsList = await pinecone.inference.embed(
    model,
    [text],
    {
      inputType: "passage",
      truncate: "END",
    }
  );

  const embeddingArray = Array.from(embeddings.data.values());

  return embeddingArray[0].values;
}
