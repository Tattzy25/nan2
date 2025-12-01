import { generateText, type ImagePart } from "ai";
import type { PutBlobResult } from "@vercel/blob";

export async function describeImageWithGrok(blob: PutBlobResult): Promise<{ title: string; shortDesc: string; longDesc: string; tags: string[]; categories: string[] }> {
  const imagePart: ImagePart = {
    type: "image",
    image: blob.downloadUrl,
    mediaType: blob.contentType,
  };

  const { text } = await generateText({
    model: "xai/grok-2-vision",
    system: "Analyze the image and provide a structured JSON response with: 'title' (concise, catchy name), 'shortDesc' (1-2 sentence attractive summary for product cards), 'longDesc' (detailed description), 'tags' (array of 5-10 relevant keywords), 'categories' (array of 2-5 categories like 'nature', 'abstract', etc.). Ensure JSON is valid and parsable.",
    messages: [
      {
        role: "user",
        content: [imagePart],
      },
    ],
  });

  return text;
}