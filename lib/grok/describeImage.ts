import { generateText, type ImagePart } from "ai";
import type { PutBlobResult } from "@vercel/blob";

export async function describeImageWithGrok(blob: PutBlobResult): Promise<{ title: string; shortDesc: string; longDesc: string; tags: string[] }> {
  const imagePart: ImagePart = {
    type: "image",
    image: blob.downloadUrl,
    mediaType: blob.contentType,
  };

  const { text } = await generateText({
    model: "xai/grok-2-vision",
    system: "Analyze the image and provide a structured JSON response with: 'title' (concise, catchy name), 'shortDesc' (1-2 sentence attractive summary for product cards), 'longDesc' (detailed prompt description suitable for image regeneration), 'tags' (array of 5-10 keywords focusing on: style, dominant colors, aspect ratio, size characteristics, and subject placement). Ensure JSON is valid and parsable.",
    messages: [
      {
        role: "user",
        content: [imagePart],
      },
    ],
  });

  return text;
}