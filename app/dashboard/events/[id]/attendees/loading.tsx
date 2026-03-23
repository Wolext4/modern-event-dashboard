import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AttendeesLoading() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-16" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-9 w-[180px]" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>

      <Skeleton className="h-10 w-full max-w-xs" />

      <Card>
        <CardHeader className="p-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-2 h-4 w-64" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-2 p-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between rounded-md border p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-4 rounded-sm" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="mt-1 h-3 w-24" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
