import { Skeleton } from "@/components/ui/skeleton"

export default function PaymentMethodsLoading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-8 w-48" />
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>

        <div className="mt-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
