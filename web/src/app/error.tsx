"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-semibold text-foreground mb-4">
        Something went wrong!
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        {error.message || "An unexpected error occurred."}
      </p>
    </div>
  );
}
