import { Skeleton } from "@/components/ui-skeleton"

export default function ProductSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Skeleton className="aspect-square w-full rounded-lg" />

      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-24 w-full" />

        <div className="pt-4">
          <Skeleton className="h-6 w-1/4 mb-2" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>

        <div className="pt-4">
          <Skeleton className="h-6 w-1/4 mb-2" />
          <div className="flex items-center">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-6 w-8 mx-4" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>

        <Skeleton className="h-12 w-full mt-6" />
      </div>
    </div>
  )
}

