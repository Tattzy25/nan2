/** biome-ignore-all lint/suspicious/noConsole: "Handy for debugging" */

import type { PutBlobResult } from "@vercel/blob";
import { describeImageWithGrok } from "@/lib/grok/describeImage";
import { FatalError, getStepMetadata, RetryableError } from "workflow";

export const generateDescription = async (blob: PutBlobResult) => {
  "use step";

  const { attempt, stepStartedAt, stepId } = getStepMetadata();

  console.log(
    `[${stepId}] Generating description (attempt ${attempt})...`,
    blob.downloadUrl
  );

  try {
    const text = await describeImageWithGrok(blob);

    console.log(
      `[${stepId}] Successfully generated description at ${stepStartedAt.toISOString()}`
    );

    return text;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    // Check for rate limiting or temporary errors
    if (
      message.includes("rate limit") ||
      message.includes("429") ||
      message.includes("quota")
    ) {
      throw new RetryableError(`Rate limited: ${message}`, {
        retryAfter: "5m",
      });
    }

    // Check for invalid image or permanent errors
    if (
      message.includes("invalid image") ||
      message.includes("unsupported") ||
      message.includes("400")
    ) {
      throw new FatalError(
        `[${stepId}] Invalid image or unsupported format: ${message}`
      );
    }

    // After 5 attempts, give up
    if (attempt >= 5) {
      throw new FatalError(
        `[${stepId}] Failed to generate description after ${attempt} attempts as of ${stepStartedAt.toISOString()}: ${message}`
      );
    }

    // Otherwise, retry with exponential backoff
    throw new Error(`AI generation failed: ${message}`);
  }
};

generateDescription.maxRetries = 5;
