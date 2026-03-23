import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function SettingsLoading() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="md:w-1/4">
          <Skeleton className="h-[300px] w-full rounded-md" />
        </div>

        <div className="flex-1 space-y-4">
          <Card>
            <CardHeader className="p-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-2 h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end p-4">
              <Skeleton className="h-10 w-32" />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-2 h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
            <CardFooter className="p-4">
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
