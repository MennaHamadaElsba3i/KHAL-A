import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton-shimmer rounded-xs", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      {/* Image Skeleton */}
      <Skeleton className="aspect-4/5 w-full bg-[#ECE5DB]" />
      
      {/* Details Skeleton */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-24 bg-[#ECE5DB]" />
          <Skeleton className="h-4 w-12 bg-[#ECE5DB]" />
        </div>
        <Skeleton className="h-3 w-32 bg-[#ECE5DB]" />
        <Skeleton className="h-3 w-48 bg-[#ECE5DB]" />
      </div>

      <Skeleton className="h-3 w-20 bg-[#ECE5DB] mt-2" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
