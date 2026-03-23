import { Skeleton } from "@/components/ui/skeleton"

export default function CancelSubscriptionLoading() {
  return (
    <div className="container mx-auto py-6 space-y-6 max-w-2xl">
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-8 w-48" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-60 w-full rounded-lg" />
      </div>
    </div>
  )
}
