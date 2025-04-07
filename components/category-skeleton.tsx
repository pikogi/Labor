import { Skeleton } from "@/components/ui-skeleton"

export default function CategorySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="overflow-hidden rounded-lg">
          <div className="aspect-square relative">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

