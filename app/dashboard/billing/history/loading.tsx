import { Skeleton } from "@/components/ui/skeleton"

export default function BillingHistoryLoading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-8 w-48" />
      </div>

      <Skeleton className="h-[400px] w-full rounded-lg" />

      <Skeleton className="h-[300px] w-full rounded-lg" />
    </div>
  )
}
