import { Suspense } from "react";
import { Header } from "@/components/ui/header";
import { Results } from "@/components/ui/results";
import { UploadedImagesProvider } from "@/components/ui/uploaded-images-provider";

const ImagesSkeleton = () => (
  <div className="columns-3 gap-4">
    {Array.from({ length: 9 }, (_, idx) => {
      const aspects = [
        "aspect-square",
        "aspect-video",
        "aspect-[9/16]",
      ];
      const aspect = aspects[idx % aspects.length];
      const className = `mb-4 rounded-xl bg-card p-2 shadow-xl ${aspect}`;
      return <div className={className} key={`skeleton-${aspect}-${idx}`} />;
    })}
  </div>
);

export const SearchOverlayContent = () => (
  <UploadedImagesProvider>
    <div className="container relative mx-auto grid items-start gap-12 px-4 py-8 sm:gap-16 lg:grid-cols-[300px_1fr]">
      <div className="lg:sticky lg:top-8">
        <Header />
      </div>
      <Suspense fallback={<ImagesSkeleton />}>
        <Results showUploadButton={false} />
      </Suspense>
    </div>
  </UploadedImagesProvider>
);
