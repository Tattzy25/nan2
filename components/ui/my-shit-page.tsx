"use client";

import { GenerationHistory } from "@/components/image-combiner/generation-history";
import { usePersistentHistory } from "@/components/image-combiner/hooks/use-persistent-history";
import { useState } from "react";

export const MyShitPage = () => {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const {
    generations: persistedGenerations,
    deleteGeneration,
    clearHistory,
    isLoading: historyLoading,
    hasMore,
    loadMore,
    isLoadingMore,
  } = usePersistentHistory(showToast);

  // Placeholder data - will be replaced with actual liked images
  const likedImages: string[] = [];

  return (
    <div className="space-y-12 pb-12">
      {/* Generated Images Section - Pure Rebellion */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Pure Rebellion</h2>
        <GenerationHistory
          generations={persistedGenerations}
          onDelete={deleteGeneration}
          onClear={clearHistory}
          isLoading={historyLoading}
          hasMore={hasMore}
          onLoadMore={loadMore}
          isLoadingMore={isLoadingMore}
        />
      </section>

      {/* Liked Images Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Ink Sanctuary</h2>
        {likedImages.length > 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {likedImages.map((img, idx) => (
              <div key={idx} className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img src={img} alt={`Liked ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-muted">
                <span className="text-sm text-muted-foreground">No favorites yet</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
