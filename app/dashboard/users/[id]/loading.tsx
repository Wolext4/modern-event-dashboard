import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function UserProfileLoading() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="md:col-span-3">
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
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <div className="flex-1 space-y-4">
                    <div>
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="mt-1 h-5 w-16 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    </div>
                    <div>
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="mt-1 h-16 w-full" />
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
              <CardContent className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Skeleton className="h-4 w-20" />
                    <div className="flex items-center gap-2 mt-1">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <div>
                    <Skeleton className="h-4 w-20" />
                    <div className="flex items-center gap-2 mt-1">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
                <Skeleton className="h-1 w-full" />
                <div>
                  <Skeleton className="h-4 w-20" />
                  <div className="mt-2 space-y-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="md:col-span-4">
          <Card>
            <CardHeader className="p-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-2 h-4 w-64" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-b px-4 py-2">
                <Skeleton className="h-10 w-full max-w-xs" />
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md border p-4">
                      <div>
                        <Skeleton className="h-5 w-32" />
                        <div className="flex items-center gap-2 mt-1">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <div className="text-right">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="mt-1 h-4 w-32 ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
