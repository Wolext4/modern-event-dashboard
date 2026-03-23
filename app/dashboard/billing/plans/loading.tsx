import { Skeleton } from "@/components/ui/skeleton"

export default function BillingPlansLoading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-8 w-48" />
      </div>

      <div className="flex flex-col items-center space-y-6">
        <Skeleton className="h-8 w-48" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <Skeleton className="h-[450px] w-full rounded-lg" />
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-48" />
        </div>
      </div>
    </div>
  )
}
