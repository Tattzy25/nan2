import { list } from "@vercel/blob";
import { ResultsClient } from "./results.client";

type ResultsProps = {
  showUploadButton?: boolean;
};

export const Results = async ({ showUploadButton = true }: ResultsProps = {}) => {
  const { blobs } = await list({ limit: 50 });

  return <ResultsClient defaultData={blobs} showUploadButton={showUploadButton} />;
};
