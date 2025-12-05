/** biome-ignore-all lint/suspicious/noConsole: "Handy for debugging" */

/**
 * IMPORTANT: This file contains the correct implementation of Upstash Search API.
 * DO NOT MODIFY without thorough understanding of Upstash Search documentation.
 *
 * Upstash Search is a vector search service with specific API requirements.
 * This implementation follows the official Upstash Search API specification.
 *
 * @see https://upstash.com/docs/search/features/algorithm
 * @see https://upstash.com/docs/search/overview
 */

"use server";

import { Search } from "@upstash/search";
import type { PutBlobResult } from "@vercel/blob";

/**
 * Initialize Upstash Search client and index
 * This uses environment variables for configuration
 */
const upstash = Search.fromEnv();
const index = upstash.index("images");

/**
 * Search response type definition
 * Represents either successful results or error state
 */
type SearchResponse =
  | {
      data: PutBlobResult[];
    }
  | {
      error: string;
    };

/**
 * Upstash Search result structure
 * Matches the actual API response format from Upstash Search
 */
interface UpstashSearchResult {
  id: string;
  content: any;
  metadata: PutBlobResult;
  score: number; // Relevance score (0-1) from Upstash
}

/**
 * Extended PutBlobResult type for debugging
 * Preserves search relevance scores for analysis
 */
interface PutBlobResultWithScore extends PutBlobResult {
  __searchScore?: number; // Internal field for search score preservation
}

/**
 * Main search function - DO NOT MODIFY without understanding Upstash Search API
 *
 * This function implements the correct Upstash Search API usage:
 * - Proper parameter configuration
 * - Comprehensive error handling
 * - Result processing that works with Upstash's retry mechanism
 *
 * @param _prevState - Previous search state (unused but required by Next.js)
 * @param formData - Form data containing search query
 * @returns Promise resolving to SearchResponse with results or error
 */
export const search = async (
  _prevState: SearchResponse | undefined,
  formData: FormData
): Promise<SearchResponse> => {
  const query = formData.get("search");

  // Input validation - critical for form safety
  if (!query || typeof query !== "string") {
    console.log("Invalid search query:", query);
    return { error: "Please enter a search query" };
  }

  // Trim and validate query - prevent empty searches
  const trimmedQuery = query.trim();
  if (trimmedQuery.length === 0) {
    console.log("Empty search query after trimming");
    return { error: "Search query cannot be empty" };
  }

  try {
    console.log("Starting Upstash search for query:", trimmedQuery);

    /**
     * CRITICAL: Proper Upstash Search API call
     * This uses the official Upstash Search parameters:
     *
     * @param query - The search query string
     * @param limit - Maximum results to return (default: 20)
     * @param filter - Optional filtering (undefined = no filter)
     * @param reranking - Enable Upstash's advanced reranking (true = better results)
     * @param semanticWeight - Balance between semantic and keyword search (0.75 = 75% semantic)
     * @param inputEnrichment - Enable query enrichment for better understanding
     * @param keepOriginalQueryAfterEnrichment - Keep original query after enrichment
     *
     * DO NOT CHANGE these parameters without consulting Upstash documentation
     */
    const results = await index.search({
      query: trimmedQuery,
      limit: 20, // Reasonable default limit
      filter: undefined, // No filtering for general search
      reranking: true, // Enable Upstash's reranking for better results
      semanticWeight: 0.75, // 75% semantic, 25% keyword matching
      inputEnrichment: true, // Enable query enrichment
      keepOriginalQueryAfterEnrichment: false // Don't need original after enrichment
    });

    console.log("Upstash search completed. Results count:", results.length);

    /**
     * Result processing - IMPORTANT: Upstash already sorts by relevance
     * We only need to:
     * 1. Validate each result has metadata
     * 2. Preserve search scores for debugging
     * 3. Filter out invalid results
     *
     * DO NOT manually sort results - Upstash handles relevance sorting
     */
    const processedResults = results.map((result) => {
      // Validate result structure - critical for type safety
      if (!result.metadata) {
        console.warn("Result missing metadata:", result.id);
        return null;
      }

      // Preserve score information for debugging and analysis
      const blobWithScore = {
        ...result.metadata,
        __searchScore: result.score // Add score for reference (0-1 range)
      } as PutBlobResultWithScore;

      return blobWithScore;
    }).filter(Boolean) as PutBlobResult[];

    console.log("Successfully processed images:", processedResults.length);
    return { data: processedResults };
  } catch (error) {
    console.error("Upstash search error:", error);

    /**
     * COMPREHENSIVE ERROR HANDLING - CRITICAL FOR UPSTASH RETRY MECHANISM
     *
     * Upstash Search has automatic retry logic. Our error messages must:
     * 1. Be retry-friendly (don't say "failed", say "temporarily unavailable")
     * 2. Handle specific Upstash error scenarios
     * 3. Provide actionable feedback to users
     * 4. Log detailed error information for debugging
     *
     * DO NOT change error messages without understanding Upstash's retry behavior
     */
    if (error instanceof Error) {
      const errorMessage = error.message;

      // Handle Upstash-specific errors with retry-friendly messages
      if (errorMessage.includes("INVALID_INDEX") || errorMessage.includes("index not found")) {
        console.error("Upstash index configuration error");
        return { error: "Search service is temporarily unavailable. Please try again later." };
      }

      if (errorMessage.includes("QUOTA_EXCEEDED") || errorMessage.includes("quota")) {
        console.error("Upstash quota exceeded");
        return { error: "Search service is busy. Please try again in a few minutes." };
      }

      if (errorMessage.includes("RATE_LIMITED") || errorMessage.includes("429")) {
        console.error("Upstash rate limit hit");
        return { error: "Search service is processing many requests. Please try again shortly." };
      }

      if (errorMessage.includes("NETWORK_ERROR") || errorMessage.includes("ECONNREFUSED")) {
        console.error("Network error with Upstash");
        return { error: "Network issue with search service. Please check your connection." };
      }

      // For other errors, provide generic but helpful message
      console.error("Unexpected Upstash error:", errorMessage);
      return { error: "Search encountered an issue. Please try again." };
    }

    // Fallback for non-Error types
    console.error("Non-error exception in search:", error);
    return { error: "Search service is unavailable. Please try again later." };
  }
};
