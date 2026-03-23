import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function TicketDetailsLoading() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="mt-2 h-4 w-64" />
                </div>
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="flex justify-center">
                <Skeleton className="h-40 w-40 rounded-md" />
              </div>
              <Skeleton className="h-1 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="mt-1 h-5 w-24" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="mt-1 h-5 w-24" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="mt-1 h-5 w-24" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="mt-1 h-5 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-2 h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="flex items-start gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="mt-1 h-4 w-32" />
                  <Skeleton className="mt-1 h-4 w-32" />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="mt-1 h-4 w-32" />
                  <Skeleton className="mt-1 h-4 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-2 h-4 w-64" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-6 w-40" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-2 h-4 w-64" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col items-center justify-center space-y-4 rounded-md border p-6">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="text-center">
                  <Skeleton className="mx-auto h-5 w-32" />
                  <Skeleton className="mx-auto mt-1 h-4 w-48" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-2 h-4 w-64" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
